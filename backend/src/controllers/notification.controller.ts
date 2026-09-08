import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { page = 1, limit = 20, unreadOnly = false } = req.query;

  const query = db('notifications').where({ user_id: userId });

  if (unreadOnly === 'true') {
    query.where({ read: false });
  }

  const notifications = await query
    .orderBy('created_at', 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  const [{ count }] = await query.clone().clearOrder().clearLimit().clearOffset().count('id as count');

  const unreadCount = await db('notifications')
    .where({ user_id: userId, read: false })
    .count('id as count')
    .first();

  res.json({
    success: true,
    notifications,
    unreadCount: Number(unreadCount?.count || 0),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      pages: Math.ceil(Number(count) / Number(limit)),
    },
  });
});

export const markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const notification = await db('notifications')
    .where({ id, user_id: userId })
    .first();

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found',
    });
  }

  await db('notifications').where({ id }).update({ read: true });

  res.json({
    success: true,
    message: 'Notification marked as read',
  });
});

export const markAllAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  await db('notifications')
    .where({ user_id: userId, read: false })
    .update({ read: true });

  res.json({
    success: true,
    message: 'All notifications marked as read',
  });
});

export const deleteNotification = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const notification = await db('notifications')
    .where({ id, user_id: userId })
    .first();

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found',
    });
  }

  await db('notifications').where({ id }).delete();

  res.json({
    success: true,
    message: 'Notification deleted',
  });
});

export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  emoji: string = '🔔',
  itemId?: string
) => {
  const [notification] = await db('notifications')
    .insert({
      user_id: userId,
      type,
      title,
      message,
      emoji,
      item_id: itemId,
      read: false,
    })
    .returning('*');

  return notification;
};
