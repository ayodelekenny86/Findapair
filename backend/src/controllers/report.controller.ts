import { Request, Response } from 'express';
import db from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const createReport = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reporterId = req.user!.id;
  const { itemId, reason, description } = req.body;

  // Verify item exists
  const item = await db('items').where({ id: itemId }).first();
  if (!item) {
    throw new AppError('Item not found', 404);
  }

  // Check if already reported by this user
  const existingReport = await db('reports')
    .where({ item_id: itemId, reporter_id: reporterId })
    .first();

  if (existingReport) {
    throw new AppError('You have already reported this item', 400);
  }

  const [report] = await db('reports')
    .insert({
      item_id: itemId,
      reporter_id: reporterId,
      reason,
      description,
      status: 'pending',
    })
    .returning('*');

  logger.info(`Item ${itemId} reported by user ${reporterId}: ${reason}`);

  res.status(201).json({
    success: true,
    message: 'Report submitted successfully',
    report,
  });
});

export const getReports = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20, status = 'pending' } = req.query;

  const reports = await db('reports')
    .where({ status })
    .orderBy('created_at', 'desc')
    .limit(Number(limit))
    .offset((Number(page) - 1) * Number(limit));

  // Get item and reporter details
  const reportsWithDetails = await Promise.all(
    reports.map(async (report: any) => {
      const item = await db('items').where({ id: report.item_id }).first();
      const reporter = await db('users')
        .where({ id: report.reporter_id })
        .select('id', 'name', 'avatar')
        .first();

      return {
        ...report,
        item,
        reporter,
      };
    })
  );

  const [{ count }] = await db('reports').where({ status }).count('id as count').first();

  res.json({
    success: true,
    reports: reportsWithDetails,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      pages: Math.ceil(Number(count) / Number(limit)),
    },
  });
});

export const reviewReport = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const reviewerId = req.user!.id;

  const report = await db('reports').where({ id }).first();

  if (!report) {
    throw new AppError('Report not found', 404);
  }

  await db('reports').where({ id }).update({
    status,
    reviewed_by: reviewerId,
    reviewed_at: new Date(),
  });

  // If resolved, take action on the item
  if (status === 'resolved') {
    await db('items').where({ id: report.item_id }).update({ status: 'expired' });
    logger.info(`Item ${report.item_id} expired due to resolved report ${id}`);
  }

  // Create audit log
  await db('audit_logs').insert({
    action: 'report_reviewed',
    user_id: reviewerId,
    target_id: id,
    details: `Report ${status}`,
  });

  logger.info(`Report ${id} reviewed by ${reviewerId}: ${status}`);

  res.json({
    success: true,
    message: 'Report reviewed successfully',
  });
});

export const getReportById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const report = await db('reports').where({ id }).first();

  if (!report) {
    throw new AppError('Report not found', 404);
  }

  const item = await db('items').where({ id: report.item_id }).first();
  const reporter = await db('users')
    .where({ id: report.reporter_id })
    .select('id', 'name', 'avatar', 'email')
    .first();

  let reviewer = null;
  if (report.reviewed_by) {
    reviewer = await db('users')
      .where({ id: report.reviewed_by })
      .select('id', 'name', 'avatar')
      .first();
  }

  res.json({
    success: true,
    report: {
      ...report,
      item,
      reporter,
      reviewer,
    },
  });
});
