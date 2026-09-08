import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import db from '../database/connection';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const setupWebSocket = (io: Server) => {
  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as {
        id: string;
        email: string;
        role: string;
      };

      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user.id;
    logger.info(`User connected: ${userId} (socket: ${socket.id})`);

    // Join user's personal room
    socket.join(userId);

    // Handle joining item room for real-time updates
    socket.on('join_item', (itemId: string) => {
      socket.join(`item:${itemId}`);
      logger.info(`User ${userId} joined item room: ${itemId}`);
    });

    // Handle leaving item room
    socket.on('leave_item', (itemId: string) => {
      socket.leave(`item:${itemId}`);
      logger.info(`User ${userId} left item room: ${itemId}`);
    });

    // Handle new message
    socket.on('send_message', async (data: { itemId: string; receiverId: string; text: string }) => {
      try {
        const [message] = await db('messages')
          .insert({
            item_id: data.itemId,
            sender_id: userId,
            receiver_id: data.receiverId,
            text: data.text,
          })
          .returning('*');

        // Emit to receiver
        io.to(data.receiverId).emit('new_message', message);

        // Emit to sender (confirmation)
        socket.emit('message_sent', message);

        logger.info(`Message sent from ${userId} to ${data.receiverId}`);
      } catch (error) {
        logger.error('Message sending failed:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicator
    socket.on('typing', (data: { itemId: string; receiverId: string }) => {
      io.to(data.receiverId).emit('user_typing', {
        userId,
        itemId: data.itemId,
      });
    });

    // Handle item view
    socket.on('view_item', async (itemId: string) => {
      try {
        await db('items').where({ id: itemId }).increment('views', 1);
        io.to(`item:${itemId}`).emit('item_viewed', { itemId });
      } catch (error) {
        logger.error('Item view tracking failed:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${userId} (socket: ${socket.id})`);
    });
  });

  logger.info('WebSocket server initialized');
};

// Helper function to emit events from anywhere in the app
export const emitToUser = (io: Server, userId: string, event: string, data: any) => {
  io.to(userId).emit(event, data);
};

export const emitToItem = (io: Server, itemId: string, event: string, data: any) => {
  io.to(`item:${itemId}`).emit(event, data);
};

export const emitToAll = (io: Server, event: string, data: any) => {
  io.emit(event, data);
};
