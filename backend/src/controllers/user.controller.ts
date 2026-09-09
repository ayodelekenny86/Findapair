import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.params.id || req.user!.id;

  const user = await db('users')
    .where({ id: userId })
    .select('id', 'name', 'email', 'avatar', 'role', 'trust_score', 'items_posted', 'items_matched', 'items_given', 'points', 'created_at')
    .first();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    user,
  });
});

export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { name, email, avatar, settings } = req.body;

  const updates: any = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (avatar) updates.avatar = avatar;
  if (settings) updates.settings = JSON.stringify(settings);

  await db('users').where({ id: userId }).update(updates);

  const user = await db('users').where({ id: userId }).first();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      trust_score: user.trust_score,
      settings: user.settings,
    },
  });
});

export const getUserItems = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { page = 1, limit = 20, type, status } = req.query;

  const query = db('items').where({ seller_id: userId });

  if (type) query.where({ type });
  if (status) query.where({ status });

  const items = await query
    .orderBy('created_at', 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  const [{ count }] = await db('items').where({ seller_id: userId }).count('id as count');

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

export const getUserStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await db('users').where({ id: userId }).first();
  const items = await db('items').where({ seller_id: userId });

  const stats = {
    itemsPosted: items.length,
    itemsMatched: items.filter(i => i.status === 'matched').length,
    itemsGiven: items.filter(i => i.type === 'free' && i.status === 'claimed').length,
    totalViews: items.reduce((sum, i) => sum + i.views, 0),
    totalSaves: items.reduce((sum, i) => sum + i.saves, 0),
    trustScore: user.trust_score,
    points: user.points,
  };

  res.json({
    success: true,
    stats,
  });
});

export const getUserWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const user = await db('users').where({ id: userId }).first();
  const wishlistIds = JSON.parse(user.wishlist || '[]');

  if (wishlistIds.length === 0) {
    return res.json({
      success: true,
      items: [],
    });
  }

  const items = await db('items').whereIn('id', wishlistIds);

  res.json({
    success: true,
    items,
  });
});

export const addToWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { itemId } = req.body;

  const user = await db('users').where({ id: userId }).first();
  const wishlist = JSON.parse(user.wishlist || '[]');

  if (!wishlist.includes(itemId)) {
    wishlist.push(itemId);
    await db('users').where({ id: userId }).update({ wishlist: JSON.stringify(wishlist) });

    // Increment saves count
    await db('items').where({ id: itemId }).increment('saves', 1);
  }

  res.json({
    success: true,
    message: 'Item added to wishlist',
  });
});

export const removeFromWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { itemId } = req.params;

  const user = await db('users').where({ id: userId }).first();
  const wishlist = JSON.parse(user.wishlist || '[]');

  const filteredWishlist = wishlist.filter((id: string) => id !== itemId);
  await db('users').where({ id: userId }).update({ wishlist: JSON.stringify(filteredWishlist) });

  // Decrement saves count
  await db('items').where({ id: itemId }).decrement('saves', 1);

  res.json({
    success: true,
    message: 'Item removed from wishlist',
  });
});
