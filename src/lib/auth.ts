// ============================================
// Authentication & Authorization System
// Role-based access control (RBAC)
// ============================================

import { db } from './db'

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest'

export interface Permission {
  id: string
  name: string
  description: string
}

export interface Role {
  id: UserRole
  name: string
  permissions: string[]
  color: string
  icon: string
}

export const ROLES: Record<UserRole, Role> = {
  admin: {
    id: 'admin',
    name: 'Administrator',
    permissions: ['*'], // All permissions
    color: '#ef4444',
    icon: '👑',
  },
  moderator: {
    id: 'moderator',
    name: 'Moderator',
    permissions: [
      'items:read',
      'items:update',
      'items:delete',
      'items:moderate',
      'users:read',
      'reports:manage',
      'content:moderate',
    ],
    color: '#f59e0b',
    icon: '🛡️',
  },
  user: {
    id: 'user',
    name: 'User',
    permissions: [
      'items:read',
      'items:create',
      'items:update:own',
      'items:delete:own',
      'profile:read',
      'profile:update',
      'messages:read',
      'messages:create',
      'wishlist:manage',
    ],
    color: '#06b6d4',
    icon: '👤',
  },
  guest: {
    id: 'guest',
    name: 'Guest',
    permissions: ['items:read'],
    color: '#71717a',
    icon: '👁️',
  },
}

export interface AuthState {
  isAuthenticated: boolean
  user: any | null
  role: UserRole
  permissions: string[]
}

class AuthService {
  private storageKey = 'findapair_auth'

  // Initialize auth state
  init(): AuthState {
    const stored = localStorage.getItem(this.storageKey)
    if (stored) {
      try {
        const auth = JSON.parse(stored)
        const role = auth.role as UserRole
        return {
          isAuthenticated: true,
          user: auth.user,
          role,
          permissions: ROLES[role].permissions,
        }
      } catch {
        return this.getGuestState()
      }
    }
    return this.getGuestState()
  }

  private getGuestState(): AuthState {
    return {
      isAuthenticated: false,
      user: null,
      role: 'guest',
      permissions: ROLES.guest.permissions,
    }
  }

  // Login (simulated)
  async login(email: string, password: string): Promise<AuthState> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = db.getCurrentUser()
    
    // Check if user is admin (by email)
    let role: UserRole = 'user'
    if (email === 'admin@findapair.org') {
      role = 'admin'
    } else if (email === 'moderator@findapair.org') {
      role = 'moderator'
    }

    const authState: AuthState = {
      isAuthenticated: true,
      user,
      role,
      permissions: ROLES[role].permissions,
    }

    localStorage.setItem(this.storageKey, JSON.stringify({
      user,
      role,
    }))

    return authState
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.storageKey)
  }

  // Check if user has permission
  hasPermission(permission: string): boolean {
    const auth = this.init()
    if (auth.permissions.includes('*')) return true
    return auth.permissions.includes(permission)
  }

  // Check if user is admin
  isAdmin(): boolean {
    const auth = this.init()
    return auth.role === 'admin'
  }

  // Check if user is moderator or admin
  isModerator(): boolean {
    const auth = this.init()
    return auth.role === 'moderator' || auth.role === 'admin'
  }

  // Get current user role
  getRole(): UserRole {
    const auth = this.init()
    return auth.role
  }

  // Update user role (admin only)
  async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    if (!this.isAdmin()) {
      throw new Error('Unauthorized: Only admins can change roles')
    }

    // In a real app, this would update the user in the database
    console.log(`User ${userId} role changed to ${newRole}`)
    return true
  }

  // Register new user
  async register(email: string, password: string, name: string): Promise<AuthState> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Create new user in database
    const user = db.getCurrentUser()
    user.email = email
    user.name = name
    db.updateCurrentUser(user)

    const authState: AuthState = {
      isAuthenticated: true,
      user,
      role: 'user',
      permissions: ROLES.user.permissions,
    }

    localStorage.setItem(this.storageKey, JSON.stringify({
      user,
      role: 'user',
    }))

    return authState
  }

  // Get all users (admin only)
  async getAllUsers(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Unauthorized: Only admins can view all users')
    }

    // In a real app, this would fetch from database
    // For now, return current user
    return [db.getCurrentUser()]
  }

  // Ban user (admin/moderator only)
  async banUser(userId: string, reason: string): Promise<boolean> {
    if (!this.isModerator()) {
      throw new Error('Unauthorized: Only moderators can ban users')
    }

    console.log(`User ${userId} banned for: ${reason}`)
    return true
  }

  // Unban user (admin/moderator only)
  async unbanUser(userId: string): Promise<boolean> {
    if (!this.isModerator()) {
      throw new Error('Unauthorized: Only moderators can unban users')
    }

    console.log(`User ${userId} unbanned`)
    return true
  }
}

export const authService = new AuthService()
