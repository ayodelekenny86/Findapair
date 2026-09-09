import express from 'express';
import multer from 'multer';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getSimilarItems,
  searchItems,
} from '../controllers/item.controller';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createItemSchema, updateItemSchema } from '../middleware/validation';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Public routes
router.get('/', optionalAuth, getAllItems);
router.get('/search', searchItems);
router.get('/:id', optionalAuth, getItemById);
router.get('/:id/similar', getSimilarItems);

// Protected routes
router.post('/', authenticate, upload.array('images', 10), validate(createItemSchema), createItem);
router.put('/:id', authenticate, upload.array('images', 10), validate(updateItemSchema), updateItem);
router.delete('/:id', authenticate, deleteItem);

export default router;
