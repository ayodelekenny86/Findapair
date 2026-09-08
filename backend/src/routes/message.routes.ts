import express from 'express';
import {
  getMessages,
  sendMessage,
  markAsRead,
  markAllAsRead,
  getConversations,
} from '../controllers/message.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { sendMessageSchema } from '../middleware/validation';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getMessages);
router.get('/conversations', getConversations);
router.post('/', validate(sendMessageSchema), sendMessage);
router.patch('/:messageId/read', markAsRead);
router.patch('/read-all', markAllAsRead);

export default router;
