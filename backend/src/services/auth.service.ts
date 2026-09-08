import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/connection';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class AuthService {
  async register(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const [user] = await db('users')
      .insert({
        name,
        email,
        password_hash: passwordHash,
        role: 'user',
        status: 'active',
        trust_score: 50,
        email_verified: false,
        settings: JSON.stringify({
          emailNotifications: true,
          pushNotifications: true,
          matchAlerts: true,
          weeklyDigest: false,
          theme: 'dark',
        }),
      })
      .returning(['id', 'name', 'email', 'role', 'avatar', 'trust_score']);

    // Generate tokens
    const tokens = this.generateTokens(user);

    logger.info(`User registered: ${user.id}`);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await db('users').where({ email }).first();
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new AppError(`Account is ${user.status}`, 403);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    await db('users').where({ id: user.id }).update({ last_login: new Date() });

    // Generate tokens
    const tokens = this.generateTokens(user);

    logger.info(`User logged in: ${user.id}`);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as {
        id: string;
      };

      const user = await db('users').where({ id: decoded.id }).first();
      if (!user || user.status !== 'active') {
        throw new AppError('Invalid refresh token', 401);
      }

      const tokens = this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Current password is incorrect', 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db('users').where({ id: userId }).update({ password_hash: passwordHash });

    logger.info(`Password changed for user: ${userId}`);
  }

  private generateTokens(user: any) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    return {
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
    };
  }
}

export const authService = new AuthService();
