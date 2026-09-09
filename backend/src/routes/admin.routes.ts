import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  banUser,
  unbanUser,
  getDashboardStats,
  getAuditLogs,
  getSiteSettings,
  updateSiteSettings,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { updateUserRoleSchema, banUserSchema } from '../middleware/validation';

const router = express.Router();

// All routes require authentication and admin/moderator role
router.use(authenticate, authorize('admin', 'moderator'));

// Dashboard
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id/role', authorize('admin'), validate(updateUserRoleSchema), updateUserRole);
router.post('/users/:id/ban', validate(banUserSchema), banUser);
router.post('/users/:id/unban', unbanUser);

// Audit logs
router.get('/audit-logs', authorize('admin'), getAuditLogs);

// Site settings
router.get('/settings', getSiteSettings);
router.put('/settings', authorize('admin'), updateSiteSettings);

export default router;
