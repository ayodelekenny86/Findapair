import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await authService.register(name, email, password);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    ...result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.json({
    success: true,
    message: 'Login successful',
    ...result,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const tokens = await authService.refreshToken(refreshToken);

  res.json({
    success: true,
    ...tokens,
  });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const db = (await import('../database/connection')).default;
  const user = await db('users').where({ id: userId }).first();

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      trust_score: user.trust_score,
      status: user.status,
      email_verified: user.email_verified,
      items_posted: user.items_posted,
      items_matched: user.items_matched,
      items_given: user.items_given,
      points: user.points,
      settings: user.settings,
    },
  });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(userId, currentPassword, newPassword);

  res.json({
    success: true,
    message: 'Password changed successfully',
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  // In a real app, you might want to blacklist the token in Redis
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});
