import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const getMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { itemId } = req.query;

  const query = db('messages')
    .where(function() {
      this.where({ sender_id: userId }).orWhere({ receiver_id: userId });
    });

  if (itemId) {
    query.where({ item_id: itemId });
  }

  const messages = await query
    .orderBy('created_at', 'desc')
    .limit(100);

  res.json({
    success: true,
    messages,
  });
});

export const sendMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const senderId = req.user!.id;
  const { itemId, receiverId, text } = req.body;

  // Verify item exists
  const item = await db('items').where({ id: itemId }).first();
  if (!item) {
    throw new AppError('Item not found', 404);
  }

  // Verify receiver exists
  const receiver = await db('users').where({ id: receiverId }).first();
  if (!receiver) {
    throw new AppError('Receiver not found', 404);
  }

  const [message] = await db('messages')
    .insert({
      item_id: itemId,
      sender_id: senderId,
      receiver_id: receiverId,
      text,
    })
    .returning('*');

  // Create notification for receiver
  await db('notifications').insert({
    user_id: receiverId,
    type: 'message',
    title: 'New Message',
    message: `You have a new message about "${item.title}"`,
    emoji: '💬',
    item_id: itemId,
  });

  // Emit WebSocket event (if io is available)
  const io = req.app.get('io');
  if (io) {
    io.to(receiverId).emit('new_message', message);
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: message,
  });
});

export const markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { messageId } = req.params;

  const message = await db('messages')
    .where({ id: messageId, receiver_id: userId })
    .first();

  if (!message) {
    throw new AppError('Message not found', 404);
  }

  await db('messages').where({ id: messageId }).update({ read: true });

  res.json({
    success: true,
    message: 'Message marked as read',
  });
});

export const markAllAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  await db('messages')
    .where({ receiver_id: userId, read: false })
    .update({ read: true });

  res.json({
    success: true,
    message: 'All messages marked as read',
  });
});

export const getConversations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  // Get unique conversations
  const conversations = await db('messages')
    .where(function() {
      this.where({ sender_id: userId }).orWhere({ receiver_id: userId });
    })
    .select('item_id')
    .distinct('item_id');

  const result = [];

  for (const conv of conversations) {
    const item = await db('items').where({ id: conv.item_id }).first();
    const lastMessage = await db('messages')
      .where({ item_id: conv.item_id })
      .orderBy('created_at', 'desc')
      .first();

    const unreadCount = await db('messages')
      .where({ item_id: conv.item_id, receiver_id: userId, read: false })
      .count('id as count')
      .first();

    result.push({
      item,
      lastMessage,
      unreadCount: Number(unreadCount?.count || 0),
    });
  }

  res.json({
    success: true,
    conversations: result,
  });
});
