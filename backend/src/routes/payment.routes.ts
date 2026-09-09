import express from 'express';
import {
  createCheckoutSession,
  createFeaturedListingSession,
  handleWebhook,
  createCustomerPortalSession,
} from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createCheckoutSchema, createFeaturedListingSchema } from '../middleware/validation';

const router = express.Router();

// Webhook (no auth, needs raw body)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/checkout', authenticate, validate(createCheckoutSchema), createCheckoutSession);
router.post('/featured-listing', authenticate, validate(createFeaturedListingSchema), createFeaturedListingSession);
router.post('/customer-portal', authenticate, createCustomerPortalSession);

export default router;
