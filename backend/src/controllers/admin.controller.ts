import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const getAllUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20, role, status, search } = req.query;

  const query = db('users');

  if (role) query.where({ role });
  if (status) query.where({ status });
  if (search) {
    query.where(function() {
      this.where('name', 'ilike', `%${search}%`)
        .orWhere('email', 'ilike', `%${search}%`);
    });
  }

  const users = await query
    .select('id', 'name', 'email', 'avatar', 'role', 'status', 'trust_score', 'items_posted', 'created_at', 'last_login')
    .orderBy('created_at', 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  const [{ count }] = await query.clone().clearOrder().clearLimit().clearOffset().count('id as count');

  res.json({
    success: true,
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      pages: Math.ceil(Number(count) / Number(limit)),
    },
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    user,
  });
});

export const updateUserRole = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const adminId = req.user!.id;

  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await db('users').where({ id }).update({ role });

  // Create audit log
  await db('audit_logs').insert({
    action: 'role_change',
    user_id: adminId,
    target_id: id,
    details: `Role changed to ${role}`,
  });

  logger.info(`User ${id} role changed to ${role} by admin ${adminId}`);

  res.json({
    success: true,
    message: 'User role updated successfully',
  });
});

export const banUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  const adminId = req.user!.id;

  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await db('users').where({ id }).update({
    status: 'banned',
    ban_reason: reason,
    ban_date: new Date(),
  });

  // Create audit log
  await db('audit_logs').insert({
    action: 'user_banned',
    user_id: adminId,
    target_id: id,
    details: `Banned: ${reason}`,
  });

  logger.info(`User ${id} banned by admin ${adminId}: ${reason}`);

  res.json({
    success: true,
    message: 'User banned successfully',
  });
});

export const unbanUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const adminId = req.user!.id;

  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await db('users').where({ id }).update({
    status: 'active',
    ban_reason: null,
    ban_date: null,
  });

  // Create audit log
  await db('audit_logs').insert({
    action: 'user_unbanned',
    user_id: adminId,
    target_id: id,
    details: 'User unbanned',
  });

  logger.info(`User ${id} unbanned by admin ${adminId}`);

  res.json({
    success: true,
    message: 'User unbanned successfully',
  });
});

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const totalUsers = await db('users').count('id as count').first();
  const activeUsers = await db('users').where({ status: 'active' }).count('id as count').first();
  const totalItems = await db('items').count('id as count').first();
  const activeItems = await db('items').where({ status: 'active' }).count('id as count').first();
  const pendingReports = await db('reports').where({ status: 'pending' }).count('id as count').first();

  const recentUsers = await db('users')
    .orderBy('created_at', 'desc')
    .limit(5)
    .select('id', 'name', 'email', 'avatar', 'created_at');

  const recentItems = await db('items')
    .orderBy('created_at', 'desc')
    .limit(5)
    .select('id', 'title', 'emoji', 'seller_id', 'created_at');

  res.json({
    success: true,
    stats: {
      totalUsers: Number(totalUsers?.count || 0),
      activeUsers: Number(activeUsers?.count || 0),
      totalItems: Number(totalItems?.count || 0),
      activeItems: Number(activeItems?.count || 0),
      pendingReports: Number(pendingReports?.count || 0),
    },
    recentUsers,
    recentItems,
  });
});

export const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 50 } = req.query;

  const logs = await db('audit_logs')
    .orderBy('created_at', 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  const [{ count }] = await db('audit_logs').count('id as count').first();

  res.json({
    success: true,
    logs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      pages: Math.ceil(Number(count) / Number(limit)),
    },
  });
});

export const getSiteSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await db('site_settings').select('*');

  const settingsMap = {};
  settings.forEach((s: any) => {
    settingsMap[s.key] = s.value;
  });

  res.json({
    success: true,
    settings: settingsMap,
  });
});

export const updateSiteSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { settings } = req.body;
  const adminId = req.user!.id;

  for (const [key, value] of Object.entries(settings)) {
    await db('site_settings')
      .where({ key })
      .update({ value: JSON.stringify(value) })
      .catch(async () => {
        await db('site_settings').insert({ key, value: JSON.stringify(value) });
      });
  }

  // Create audit log
  await db('audit_logs').insert({
    action: 'settings_updated',
    user_id: adminId,
    details: 'Site settings updated',
    metadata: settings,
  });

  logger.info(`Site settings updated by admin ${adminId}`);

  res.json({
    success: true,
    message: 'Site settings updated successfully',
  });
});
