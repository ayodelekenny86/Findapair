// ============================================
// FindAPair API Service Layer
// Simulates real backend API calls
// ============================================

import { db, Item, User, Activity, Message, Notification } from './db'

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

// API Response wrapper
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ============ Items API ============
export const itemsApi = {
  // Get all items
  async getAll(): Promise<ApiResponse<Item[]>> {
    await delay()
    try {
      const items = db.getItems()
      return { success: true, data: items }
    } catch (error) {
      return { success: false, error: 'Failed to fetch items' }
    }
  },

  // Get items by type
  async getByType(type: 'pair' | 'free'): Promise<ApiResponse<Item[]>> {
    await delay()
    try {
      const items = db.getItems().filter(item => item.type === type)
      return { success: true, data: items }
    } catch (error) {
      return { success: false, error: 'Failed to fetch items' }
    }
  },

  // Get item by ID
  async getById(id: string): Promise<ApiResponse<Item>> {
    await delay()
    try {
      const item = db.getItem(id)
      if (!item) {
        return { success: false, error: 'Item not found' }
      }
      // Increment views
      db.updateItem(id, { views: item.views + 1 })
      return { success: true, data: { ...item, views: item.views + 1 } }
    } catch (error) {
      return { success: false, error: 'Failed to fetch item' }
    }
  },

  // Create new item
  async create(item: Omit<Item, 'id' | 'postedAt' | 'saves' | 'views' | 'status'>): Promise<ApiResponse<Item>> {
    await delay(500)
    try {
      const newItem: Item = {
        ...item,
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        postedAt: Date.now(),
        saves: 0,
        views: 0,
        status: 'active',
      }
      db.addItem(newItem)
      
      // Update user stats
      const user = db.getCurrentUser()
      db.updateCurrentUser({ itemsPosted: user.itemsPosted + 1 })
      
      // Add activity
      db.addActivity({
        id: `act_${Date.now()}`,
        type: 'post',
        message: `${user.name} posted ${newItem.title}`,
        time: 'Just now',
        timestamp: Date.now(),
        emoji: newItem.emoji,
        userId: user.id,
      })
      
      return { success: true, data: newItem, message: 'Item posted successfully!' }
    } catch (error) {
      return { success: false, error: 'Failed to create item' }
    }
  },

  // Update item
  async update(id: string, updates: Partial<Item>): Promise<ApiResponse<Item>> {
    await delay()
    try {
      db.updateItem(id, updates)
      const updated = db.getItem(id)
      return { success: true, data: updated, message: 'Item updated' }
    } catch (error) {
      return { success: false, error: 'Failed to update item' }
    }
  },

  // Delete item
  async delete(id: string): Promise<ApiResponse<void>> {
    await delay()
    try {
      db.deleteItem(id)
      return { success: true, message: 'Item deleted' }
    } catch (error) {
      return { success: false, error: 'Failed to delete item' }
    }
  },

  // Search items
  async search(query: string, filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    condition?: string[]
    location?: string
    verifiedOnly?: boolean
  }): Promise<ApiResponse<Item[]>> {
    await delay(200)
    try {
      let items = db.getItems()
      
      // Text search
      if (query) {
        const q = query.toLowerCase()
        items = items.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        )
      }
      
      // Apply filters
      if (filters) {
        if (filters.category && filters.category !== 'All') {
          items = items.filter(item => item.category === filters.category)
        }
        if (filters.minPrice !== undefined) {
          items = items.filter(item => !item.price || item.price >= filters.minPrice!)
        }
        if (filters.maxPrice !== undefined) {
          items = items.filter(item => !item.price || item.price <= filters.maxPrice!)
        }
        if (filters.condition && filters.condition.length > 0) {
          items = items.filter(item => filters.condition!.includes(item.condition))
        }
        if (filters.location) {
          items = items.filter(item => item.location.toLowerCase().includes(filters.location!.toLowerCase()))
        }
        if (filters.verifiedOnly) {
          items = items.filter(item => item.verified)
        }
      }
      
      return { success: true, data: items }
    } catch (error) {
      return { success: false, error: 'Search failed' }
    }
  },

  // Increment saves
  async incrementSaves(id: string): Promise<ApiResponse<void>> {
    await delay(100)
    try {
      const item = db.getItem(id)
      if (item) {
        db.updateItem(id, { saves: item.saves + 1 })
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to save item' }
    }
  },
}

// ============ User API ============
export const userApi = {
  // Get current user
  async getCurrent(): Promise<ApiResponse<User>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: 'Failed to fetch user' }
    }
  },

  // Update user
  async update(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay()
    try {
      db.updateCurrentUser(updates)
      const user = db.getCurrentUser()
      return { success: true, data: user, message: 'Profile updated' }
    } catch (error) {
      return { success: false, error: 'Failed to update user' }
    }
  },

  // Get user stats
  async getStats(): Promise<ApiResponse<any>> {
    await delay()
    try {
      const stats = db.getStats()
      return { success: true, data: stats }
    } catch (error) {
      return { success: false, error: 'Failed to fetch stats' }
    }
  },

  // Toggle wishlist
  async toggleWishlist(itemId: string): Promise<ApiResponse<{ added: boolean }>> {
    await delay(100)
    try {
      const added = db.toggleWishlist(itemId)
      if (added) {
        await itemsApi.incrementSaves(itemId)
      }
      return { success: true, data: { added } }
    } catch (error) {
      return { success: false, error: 'Failed to update wishlist' }
    }
  },

  // Get wishlist items
  async getWishlist(): Promise<ApiResponse<Item[]>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      const items = user.wishlist
        .map(id => db.getItem(id))
        .filter((item): item is Item => item !== undefined)
      return { success: true, data: items }
    } catch (error) {
      return { success: false, error: 'Failed to fetch wishlist' }
    }
  },
}

// ============ Activities API ============
export const activitiesApi = {
  // Get activities
  async getAll(): Promise<ApiResponse<Activity[]>> {
    await delay()
    try {
      const activities = db.getActivities()
      return { success: true, data: activities }
    } catch (error) {
      return { success: false, error: 'Failed to fetch activities' }
    }
  },

  // Add activity
  async create(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<ApiResponse<Activity>> {
    await delay()
    try {
      const newActivity: Activity = {
        ...activity,
        id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      }
      db.addActivity(newActivity)
      return { success: true, data: newActivity }
    } catch (error) {
      return { success: false, error: 'Failed to create activity' }
    }
  },
}

// ============ Messages API ============
export const messagesApi = {
  // Send message
  async send(itemId: string, receiverId: string, text: string): Promise<ApiResponse<Message>> {
    await delay(500)
    try {
      const user = db.getCurrentUser()
      const message: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        itemId,
        senderId: user.id,
        receiverId,
        text,
        timestamp: Date.now(),
        read: false,
      }
      db.addMessage(message)
      return { success: true, data: message, message: 'Message sent' }
    } catch (error) {
      return { success: false, error: 'Failed to send message' }
    }
  },

  // Get messages for item
  async getByItem(itemId: string): Promise<ApiResponse<Message[]>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      const messages = db.getMessages().filter(
        msg => msg.itemId === itemId && (msg.senderId === user.id || msg.receiverId === user.id)
      )
      return { success: true, data: messages }
    } catch (error) {
      return { success: false, error: 'Failed to fetch messages' }
    }
  },
}

// ============ Notifications API ============
export const notificationsApi = {
  // Get notifications
  async getAll(): Promise<ApiResponse<Notification[]>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      return { success: true, data: user.notifications }
    } catch (error) {
      return { success: false, error: 'Failed to fetch notifications' }
    }
  },

  // Mark as read
  async markAsRead(id: string): Promise<ApiResponse<void>> {
    await delay(100)
    try {
      const user = db.getCurrentUser()
      const notifications = user.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
      db.updateCurrentUser({ notifications })
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to mark notification as read' }
    }
  },

  // Mark all as read
  async markAllAsRead(): Promise<ApiResponse<void>> {
    await delay(200)
    try {
      const user = db.getCurrentUser()
      const notifications = user.notifications.map(n => ({ ...n, read: true }))
      db.updateCurrentUser({ notifications })
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to mark all as read' }
    }
  },

  // Add notification
  async create(notification: Omit<Notification, 'id'>): Promise<ApiResponse<Notification>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }
      const notifications = [newNotification, ...user.notifications].slice(0, 50)
      db.updateCurrentUser({ notifications })
      return { success: true, data: newNotification }
    } catch (error) {
      return { success: false, error: 'Failed to create notification' }
    }
  },
}

// ============ Referrals API ============
export const referralsApi = {
  // Get referrals
  async getAll(): Promise<ApiResponse<any[]>> {
    await delay()
    try {
      const referrals = db.getReferrals()
      return { success: true, data: referrals }
    } catch (error) {
      return { success: false, error: 'Failed to fetch referrals' }
    }
  },

  // Create referral
  async create(email: string): Promise<ApiResponse<any>> {
    await delay(500)
    try {
      const user = db.getCurrentUser()
      const referral = {
        id: `ref_${Date.now()}`,
        referrerId: user.id,
        referredEmail: email,
        status: 'pending' as const,
        date: Date.now(),
        reward: 5,
      }
      db.addReferral(referral)
      return { success: true, data: referral, message: 'Referral sent!' }
    } catch (error) {
      return { success: false, error: 'Failed to create referral' }
    }
  },

  // Get referral code
  async getCode(): Promise<ApiResponse<string>> {
    await delay(100)
    try {
      const user = db.getCurrentUser()
      const code = `FINDAPAIR-${user.id.toUpperCase().slice(-8)}`
      return { success: true, data: code }
    } catch (error) {
      return { success: false, error: 'Failed to get referral code' }
    }
  },
}

// ============ Analytics API ============
export const analyticsApi = {
  // Track event
  async track(event: string, data?: any): Promise<void> {
    // Simulate analytics tracking
    console.log('[Analytics]', event, data)
    await delay(50)
  },

  // Get user analytics
  async getUserAnalytics(): Promise<ApiResponse<any>> {
    await delay()
    try {
      const user = db.getCurrentUser()
      const items = db.getItems().filter(i => i.sellerId === user.id)
      return {
        success: true,
        data: {
          totalViews: items.reduce((sum, i) => sum + i.views, 0),
          totalSaves: items.reduce((sum, i) => sum + i.saves, 0),
          conversionRate: items.length > 0 ? ((items.filter(i => i.status === 'matched').length / items.length) * 100).toFixed(1) : '0',
          avgResponseTime: '2.3h',
        },
      }
    } catch (error) {
      return { success: false, error: 'Failed to fetch analytics' }
    }
  },
}

// ============ Initialize Database ============
export function initializeDatabase() {
  db.seed()
}
