import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserItems,
  getUserStats,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { updateUserSchema } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/profile/:id', getUserProfile);
router.get('/items/:id', getUserItems);
router.get('/stats/:id', getUserStats);

// Protected routes
router.get('/me', authenticate, getUserProfile);
router.put('/me', authenticate, validate(updateUserSchema), updateUserProfile);
router.get('/me/wishlist', authenticate, getUserWishlist);
router.post('/me/wishlist', authenticate, addToWishlist);
router.delete('/me/wishlist/:itemId', authenticate, removeFromWishlist);

export default router;
