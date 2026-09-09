import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: config.email.from,
        to,
        subject,
        html,
      });

      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Email sending failed:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string) {
    const html = `
      <h1>Welcome to FindAPair!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining FindAPair. We're excited to have you on board!</p>
      <p>Start by posting your first item or browsing available listings.</p>
      <p>Best regards,<br>The FindAPair Team</p>
    `;

    return this.sendEmail(email, 'Welcome to FindAPair!', html);
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${config.frontend.url}/verify-email?token=${token}`;
    const html = `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>Or copy and paste this link: ${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    `;

    return this.sendEmail(email, 'Verify Your Email Address', html);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${config.frontend.url}/reset-password?token=${token}`;
    const html = `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>Or copy and paste this link: ${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    return this.sendEmail(email, 'Reset Your Password', html);
  }

  async sendMatchNotification(email: string, itemName: string, matchName: string) {
    const html = `
      <h1>🎉 New Match Found!</h1>
      <p>Great news! We found a potential match for your item.</p>
      <p><strong>Your Item:</strong> ${itemName}</p>
      <p><strong>Match:</strong> ${matchName}</p>
      <p>Log in to your account to view the details and connect.</p>
      <p>Best regards,<br>The FindAPair Team</p>
    `;

    return this.sendEmail(email, 'New Match Found on FindAPair!', html);
  }

  async sendItemReportedEmail(email: string, itemName: string) {
    const html = `
      <h1>Item Reported</h1>
      <p>Your item "${itemName}" has been reported by a user.</p>
      <p>Our moderation team will review the report shortly.</p>
      <p>If you believe this is a mistake, please contact support.</p>
      <p>Best regards,<br>The FindAPair Team</p>
    `;

    return this.sendEmail(email, 'Item Reported on FindAPair', html);
  }
}

export const emailService = new EmailService();
