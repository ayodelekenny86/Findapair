import express from 'express';
import {
  createReport,
  getReports,
  reviewReport,
  getReportById,
} from '../controllers/report.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createReportSchema, reviewReportSchema } from '../middleware/validation';

const router = express.Router();

// User routes
router.post('/', authenticate, validate(createReportSchema), createReport);

// Admin/moderator routes
router.get('/', authenticate, authorize('admin', 'moderator'), getReports);
router.get('/:id', authenticate, authorize('admin', 'moderator'), getReportById);
router.patch('/:id/review', authenticate, authorize('admin', 'moderator'), validate(reviewReportSchema), reviewReport);

export default router;
