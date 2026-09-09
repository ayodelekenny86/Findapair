import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { paymentService } from '../services/payment.service';
import { validate } from '../middleware/validation';
import { createCheckoutSchema, createFeaturedListingSchema } from '../middleware/validation';

export const createCheckoutSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { priceId } = req.body;

  const session = await paymentService.createCheckoutSession(userId, priceId);

  res.json({
    success: true,
    ...session,
  });
});

export const createFeaturedListingSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { itemId, duration } = req.body;

  const session = await paymentService.createFeaturedListingSession(userId, itemId, duration);

  res.json({
    success: true,
    ...session,
  });
});

export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  const payload = req.body;

  const result = await paymentService.handleWebhook(signature, payload);

  res.json(result);
});

export const createCustomerPortalSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const session = await paymentService.createCustomerPortalSession(userId);

  res.json({
    success: true,
    ...session,
  });
});
