import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { fileUploadService } from '../services/fileUpload.service';

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 20, 
    type, 
    category, 
    status = 'active',
    minPrice,
    maxPrice,
    search,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = req.query;

  const query = db('items');

  if (type) query.where({ type });
  if (category) query.where({ category });
  if (status) query.where({ status });
  if (minPrice) query.where('price', '>=', Number(minPrice));
  if (maxPrice) query.where('price', '<=', Number(maxPrice));
  if (search) {
    query.where(function() {
      this.where('title', 'ilike', `%${search}%`)
        .orWhere('description', 'ilike', `%${search}%`);
    });
  }

  const items = await query
    .orderBy(sortBy as string, sortOrder as 'asc' | 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  const [{ count }] = await query.clone().clearOrder().clearLimit().clearOffset().count('id as count');

  res.json({
    success: true,
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      pages: Math.ceil(Number(count) / Number(limit)),
    },
  });
});

export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await db('items').where({ id }).first();

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  // Increment views
  await db('items').where({ id }).increment('views', 1);

  // Get seller info
  const seller = await db('users')
    .where({ id: item.seller_id })
    .select('id', 'name', 'avatar', 'trust_score')
    .first();

  res.json({
    success: true,
    item: {
      ...item,
      seller,
    },
  });
});

export const createItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const itemData = req.body;

  // Handle image uploads
  let images = [];
  if (req.files && Array.isArray(req.files)) {
    const uploadResults = await fileUploadService.uploadMultipleImages(
      req.files as Express.Multer.File[],
      'items'
    );
    images = uploadResults.map(r => r.url);
  }

  const [item] = await db('items')
    .insert({
      ...itemData,
      seller_id: userId,
      images: JSON.stringify(images),
      status: 'active',
      views: 0,
      saves: 0,
    })
    .returning('*');

  // Update user stats
  await db('users').where({ id: userId }).increment('items_posted', 1);

  // Create activity
  await db('activities').insert({
    user_id: userId,
    type: 'post',
    message: `Posted "${item.title}"`,
    emoji: item.emoji,
  });

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    item,
  });
});

export const updateItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const updates = req.body;

  const item = await db('items').where({ id, seller_id: userId }).first();

  if (!item) {
    throw new AppError('Item not found or unauthorized', 404);
  }

  // Handle new image uploads
  if (req.files && Array.isArray(req.files)) {
    const uploadResults = await fileUploadService.uploadMultipleImages(
      req.files as Express.Multer.File[],
      'items'
    );
    const newImages = uploadResults.map(r => r.url);
    const existingImages = JSON.parse(item.images || '[]');
    updates.images = JSON.stringify([...existingImages, ...newImages]);
  }

  await db('items').where({ id }).update(updates);

  const updatedItem = await db('items').where({ id }).first();

  res.json({
    success: true,
    message: 'Item updated successfully',
    item: updatedItem,
  });
});

export const deleteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const item = await db('items').where({ id, seller_id: userId }).first();

  if (!item) {
    throw new AppError('Item not found or unauthorized', 404);
  }

  // Delete images from Cloudinary
  const images = JSON.parse(item.images || '[]');
  if (images.length > 0) {
    // Extract public IDs and delete
    // This is simplified - in production, you'd need to extract public IDs properly
  }

  await db('items').where({ id }).delete();

  // Update user stats
  await db('users').where({ id: userId }).decrement('items_posted', 1);

  res.json({
    success: true,
    message: 'Item deleted successfully',
  });
});

export const getSimilarItems = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await db('items').where({ id }).first();

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  const similarItems = await db('items')
    .where({ category: item.category, status: 'active' })
    .whereNot({ id })
    .limit(4)
    .orderBy('match_score', 'desc');

  res.json({
    success: true,
    items: similarItems,
  });
});

export const searchItems = asyncHandler(async (req: Request, res: Response) => {
  const { q, category, location, minPrice, maxPrice, limit = 20 } = req.query;

  const query = db('items').where({ status: 'active' });

  if (q) {
    query.where(function() {
      this.where('title', 'ilike', `%${q}%`)
        .orWhere('description', 'ilike', `%${q}%`);
    });
  }

  if (category) query.where({ category });
  if (location) query.where('location', 'ilike', `%${location}%`);
  if (minPrice) query.where('price', '>=', Number(minPrice));
  if (maxPrice) query.where('price', '<=', Number(maxPrice));

  const items = await query
    .orderBy('match_score', 'desc')
    .limit(Number(limit));

  res.json({
    success: true,
    items,
    count: items.length,
  });
});
