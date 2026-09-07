// ============================================
// Enhanced Database with Admin Features
// User management, content moderation, analytics
// ============================================

import { db } from './db'
import type { User, Item } from './db'
import type { UserRole } from './auth'

export interface AdminUser extends User {
  role: UserRole
  status: 'active' | 'banned' | 'suspended'
  lastLogin: number
  emailVerified: boolean
  banReason?: string
  banDate?: number
}

export interface Report {
  id: string
  itemId: string
  reporterId: string
  reason: string
  description: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  createdAt: number
  reviewedAt?: number
  reviewedBy?: string
}

export interface AuditLog {
  id: string
  action: string
  userId: string
  targetId?: string
  details: string
  timestamp: number
  metadata?: any
}

export interface SiteSettings {
  maintenanceMode: boolean
  registrationEnabled: boolean
  maxItemsPerUser: number
  requireEmailVerification: boolean
  autoApproveItems: boolean
}

class EnhancedDatabase {
  private prefix = 'findapair_enhanced_'

  // ============ User Management ============
  
  getAllUsers(): AdminUser[] {
    const stored = localStorage.getItem(`${this.prefix}users`)
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with current user as admin
    const currentUser = db.getCurrentUser()
    const adminUser: AdminUser = {
      ...currentUser,
      role: 'admin',
      status: 'active',
      lastLogin: Date.now(),
      emailVerified: true,
    }
    
    this.saveUsers([adminUser])
    return [adminUser]
  }

  private saveUsers(users: AdminUser[]): void {
    localStorage.setItem(`${this.prefix}users`, JSON.stringify(users))
  }

  getUserById(userId: string): AdminUser | null {
    const users = this.getAllUsers()
    return users.find(u => u.id === userId) || null
  }

  updateUserRole(userId: string, role: UserRole): boolean {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    if (index === -1) return false
    
    users[index].role = role
    this.saveUsers(users)
    this.addAuditLog('role_change', userId, undefined, `Role changed to ${role}`)
    return true
  }

  banUser(userId: string, reason: string): boolean {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    if (index === -1) return false
    
    users[index].status = 'banned'
    users[index].banReason = reason
    users[index].banDate = Date.now()
    this.saveUsers(users)
    this.addAuditLog('user_banned', userId, undefined, `Banned: ${reason}`)
    return true
  }

  unbanUser(userId: string): boolean {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    if (index === -1) return false
    
    users[index].status = 'active'
    users[index].banReason = undefined
    users[index].banDate = undefined
    this.saveUsers(users)
    this.addAuditLog('user_unbanned', userId, undefined, 'User unbanned')
    return true
  }

  suspendUser(userId: string, reason: string): boolean {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    if (index === -1) return false
    
    users[index].status = 'suspended'
    users[index].banReason = reason
    users[index].banDate = Date.now()
    this.saveUsers(users)
    this.addAuditLog('user_suspended', userId, undefined, `Suspended: ${reason}`)
    return true
  }

  // ============ Content Moderation ============

  getReports(): Report[] {
    const stored = localStorage.getItem(`${this.prefix}reports`)
    return stored ? JSON.parse(stored) : []
  }

  addReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): Report {
    const reports = this.getReports()
    const newReport: Report = {
      ...report,
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      status: 'pending',
    }
    reports.push(newReport)
    localStorage.setItem(`${this.prefix}reports`, JSON.stringify(reports))
    return newReport
  }

  reviewReport(reportId: string, status: Report['status'], reviewedBy: string): boolean {
    const reports = this.getReports()
    const index = reports.findIndex(r => r.id === reportId)
    if (index === -1) return false
    
    reports[index].status = status
    reports[index].reviewedAt = Date.now()
    reports[index].reviewedBy = reviewedBy
    localStorage.setItem(`${this.prefix}reports`, JSON.stringify(reports))
    this.addAuditLog('report_reviewed', reviewedBy, reportId, `Status: ${status}`)
    return true
  }

  deleteItem(itemId: string, reason: string, deletedBy: string): boolean {
    const items = db.getItems()
    const index = items.findIndex(i => i.id === itemId)
    if (index === -1) return false
    
    items.splice(index, 1)
    db.setItems(items)
    this.addAuditLog('item_deleted', deletedBy, itemId, `Reason: ${reason}`)
    return true
  }

  // ============ Audit Logs ============

  getAuditLogs(limit: number = 100): AuditLog[] {
    const stored = localStorage.getItem(`${this.prefix}audit_logs`)
    const logs: AuditLog[] = stored ? JSON.parse(stored) : []
    return logs.slice(0, limit)
  }

  private addAuditLog(action: string, userId: string, targetId: string | undefined, details: string, metadata?: any): void {
    const logs = this.getAuditLogs()
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      userId,
      targetId,
      details,
      timestamp: Date.now(),
      metadata,
    }
    logs.unshift(newLog)
    localStorage.setItem(`${this.prefix}audit_logs`, JSON.stringify(logs.slice(0, 1000)))
  }

  // ============ Site Settings ============

  getSiteSettings(): SiteSettings {
    const stored = localStorage.getItem(`${this.prefix}site_settings`)
    if (stored) {
      return JSON.parse(stored)
    }
    
    const defaults: SiteSettings = {
      maintenanceMode: false,
      registrationEnabled: true,
      maxItemsPerUser: 50,
      requireEmailVerification: false,
      autoApproveItems: true,
    }
    
    this.saveSiteSettings(defaults)
    return defaults
  }

  saveSiteSettings(settings: SiteSettings): void {
    localStorage.setItem(`${this.prefix}site_settings`, JSON.stringify(settings))
    this.addAuditLog('settings_updated', 'admin', undefined, 'Site settings updated', settings)
  }

  // ============ Analytics ============

  getAdminStats() {
    const users = this.getAllUsers()
    const items = db.getItems()
    const reports = this.getReports()

    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      bannedUsers: users.filter(u => u.status === 'banned').length,
      totalItems: items.length,
      activeItems: items.filter(i => i.status === 'active').length,
      matchedItems: items.filter(i => i.status === 'matched').length,
      pendingReports: reports.filter(r => r.status === 'pending').length,
      totalReports: reports.length,
      resolvedReports: reports.filter(r => r.status === 'resolved').length,
    }
  }

  // ============ Items Management ============

  getAllItems(): Item[] {
    const stored = localStorage.getItem('findapair_items')
    return stored ? JSON.parse(stored) : []
  }

  getItemById(itemId: string): Item | undefined {
    const items = this.getAllItems()
    return items.find(i => i.id === itemId)
  }

  featureItem(itemId: string, featured: boolean): boolean {
    // TODO: Implement feature item
    console.log('Feature item:', itemId, featured)
    return true
  }

  verifyItem(itemId: string, verified: boolean): boolean {
    // TODO: Implement verify item
    console.log('Verify item:', itemId, verified)
    return true
  }
}

export const enhancedDb = new EnhancedDatabase()
