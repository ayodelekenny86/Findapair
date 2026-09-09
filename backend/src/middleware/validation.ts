import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new AppError(`Validation error: ${errors.join(', ')}`, 400));
    }

    next();
  };
};

// Auth schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Item schemas
export const createItemSchema = Joi.object({
  type: Joi.string().valid('pair', 'free').required(),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(2000).required(),
  category: Joi.string().required(),
  emoji: Joi.string().default('📦'),
  location: Joi.string().required(),
  price: Joi.number().min(0).when('type', {
    is: 'pair',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  originalPrice: Joi.number().min(0).optional(),
  condition: Joi.string().valid('New', 'Like New', 'Excellent', 'Good', 'Fair').default('Good'),
  donationOption: Joi.boolean().default(false),
  urgency: Joi.string().valid('normal', 'high', 'must-go').default('normal'),
});

export const updateItemSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).max(2000).optional(),
  category: Joi.string().optional(),
  emoji: Joi.string().optional(),
  location: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  originalPrice: Joi.number().min(0).optional(),
  condition: Joi.string().valid('New', 'Like New', 'Excellent', 'Good', 'Fair').optional(),
  donationOption: Joi.boolean().optional(),
  urgency: Joi.string().valid('normal', 'high', 'must-go').optional(),
  status: Joi.string().valid('active', 'matched', 'claimed', 'expired').optional(),
});

// User schemas
export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  avatar: Joi.string().optional(),
  settings: Joi.object().optional(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

// Message schemas
export const sendMessageSchema = Joi.object({
  itemId: Joi.string().uuid().required(),
  receiverId: Joi.string().uuid().required(),
  text: Joi.string().min(1).max(1000).required(),
});

// Report schemas
export const createReportSchema = Joi.object({
  itemId: Joi.string().uuid().required(),
  reason: Joi.string().required(),
  description: Joi.string().max(1000).optional(),
});

export const reviewReportSchema = Joi.object({
  status: Joi.string().valid('reviewed', 'resolved', 'dismissed').required(),
});

// Admin schemas
export const updateUserRoleSchema = Joi.object({
  role: Joi.string().valid('admin', 'moderator', 'user', 'guest').required(),
});

export const banUserSchema = Joi.object({
  reason: Joi.string().required(),
});

// Payment schemas
export const createCheckoutSchema = Joi.object({
  priceId: Joi.string().required(),
});

export const createFeaturedListingSchema = Joi.object({
  itemId: Joi.string().uuid().required(),
  duration: Joi.number().valid(7, 14, 30).required(),
});
