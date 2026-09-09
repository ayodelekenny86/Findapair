// ============================================
// FindAPair Database Layer (localStorage-backed)
// Simulates a real database with full CRUD
// ============================================

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  trustScore: number
  joinDate: string
  itemsPosted: number
  itemsMatched: number
  itemsGiven: number
  points: number
  wishlist: string[]
  notifications: Notification[]
  settings: UserSettings
}

export interface UserSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  matchAlerts: boolean
  weeklyDigest: boolean
  theme: 'dark' | 'light'
}

export interface Notification {
  id: string
  type: 'match' | 'claim' | 'message' | 'system' | 'referral'
  title: string
  message: string
  time: string
  read: boolean
  emoji: string
  itemId?: string
}

export interface Item {
  id: string
  type: 'pair' | 'free'
  title: string
  description: string
  category: string
  emoji: string
  location: string
  postedAgo: string
  postedAt: number
  seller: string
  sellerId: string
  price?: number
  originalPrice?: number
  matchScore: number
  verified: boolean
  condition: string
  trustScore: number
  saves: number
  views: number
  donationOption: boolean
  urgency: 'normal' | 'high' | 'must-go'
  status: 'active' | 'matched' | 'claimed' | 'expired'
  images: string[]
}

export interface Message {
  id: string
  itemId: string
  senderId: string
  receiverId: string
  text: string
  timestamp: number
  read: boolean
}

export interface Activity {
  id: string
  type: 'match' | 'free' | 'donation' | 'post' | 'claim'
  message: string
  time: string
  timestamp: number
  emoji: string
  userId: string
}

export interface Referral {
  id: string
  referrerId: string
  referredEmail: string
  status: 'pending' | 'active' | 'rewarded'
  date: number
  reward: number
}

// ============ Database Class ============
class Database {
  private prefix = 'findapair_'

  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(this.prefix + key)
      return data ? JSON.parse(data) : fallback
    } catch {
      return fallback
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value))
    } catch (e) {
      console.error('DB write error:', e)
    }
  }

  // ---- Items ----
  getItems(): Item[] {
    return this.get<Item[]>('items', [])
  }

  setItems(items: Item[]): void {
    this.set('items', items)
  }

  getItem(id: string): Item | undefined {
    return this.getItems().find(i => i.id === id)
  }

  addItem(item: Item): void {
    const items = this.getItems()
    items.unshift(item)
    this.setItems(items)
  }

  updateItem(id: string, updates: Partial<Item>): void {
    const items = this.getItems()
    const index = items.findIndex(i => i.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      this.setItems(items)
    }
  }

  deleteItem(id: string): void {
    this.setItems(this.getItems().filter(i => i.id !== id))
  }

  // ---- User ----
  getCurrentUser(): User {
    return this.get<User>('currentUser', this.getDefaultUser())
  }

  setCurrentUser(user: User): void {
    this.set('currentUser', user)
  }

  updateCurrentUser(updates: Partial<User>): void {
    const user = this.getCurrentUser()
    this.setCurrentUser({ ...user, ...updates })
  }

  // ---- Messages ----
  getMessages(): Message[] {
    return this.get<Message[]>('messages', [])
  }

  addMessage(msg: Message): void {
    const messages = this.getMessages()
    messages.push(msg)
    this.set('messages', messages)
  }

  // ---- Activities ----
  getActivities(): Activity[] {
    return this.get<Activity[]>('activities', [])
  }

  addActivity(activity: Activity): void {
    const activities = this.getActivities()
    activities.unshift(activity)
    this.set('activities', activities.slice(0, 50))
  }

  // ---- Referrals ----
  getReferrals(): Referral[] {
    return this.get<Referral[]>('referrals', [])
  }

  addReferral(referral: Referral): void {
    const referrals = this.getReferrals()
    referrals.push(referral)
    this.set('referrals', referrals)
  }

  // ---- Stats ----
  getStats() {
    const items = this.getItems()
    const user = this.getCurrentUser()
    return {
      totalMembers: 12847 + items.length,
      pairsMatched: 3291 + items.filter(i => i.status === 'matched').length,
      freeItemsGiven: 8562 + items.filter(i => i.type === 'free' && i.status === 'claimed').length,
      wastePrevented: 4.2 + (items.length * 0.003),
      userItems: user.itemsPosted,
      userMatches: user.itemsMatched,
      userGiven: user.itemsGiven,
    }
  }

  // ---- Wishlist ----
  toggleWishlist(itemId: string): boolean {
    const user = this.getCurrentUser()
    const isInWishlist = user.wishlist.includes(itemId)
    if (isInWishlist) {
      user.wishlist = user.wishlist.filter(id => id !== itemId)
    } else {
      user.wishlist.push(itemId)
    }
    this.setCurrentUser(user)
    return !isInWishlist
  }

  // ---- Default Data ----
  private getDefaultUser(): User {
    return {
      id: 'user_1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '👤',
      trustScore: 95,
      joinDate: '2024-03-15',
      itemsPosted: 5,
      itemsMatched: 3,
      itemsGiven: 8,
      points: 1247,
      wishlist: [],
      notifications: [],
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        matchAlerts: true,
        weeklyDigest: false,
        theme: 'dark',
      },
    }
  }

  // ---- Seed Data ----
  seed(): void {
    if (this.getItems().length > 0) return

    const pairItems: Item[] = [
      { id: 'p1', type: 'pair', title: 'Left Gold Hoop Earring - 14k', description: 'Lost the right one at a concert. 14k gold, medium size hoop. Looking for an identical match.', category: 'Earrings', emoji: '💎', location: 'Manhattan, NY', postedAgo: '2h ago', postedAt: Date.now() - 7200000, seller: 'Sarah K.', sellerId: 'u2', price: 85, originalPrice: 320, matchScore: 94, verified: true, condition: 'Excellent', trustScore: 98, saves: 24, views: 156, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p2', type: 'pair', title: 'Right Nike Air Max - Size 10', description: 'My dog chewed the left one! Brand new Nike Air Max 90, black/white. Only worn twice.', category: 'Shoes', emoji: '👟', location: 'Brooklyn, NY', postedAgo: '5h ago', postedAt: Date.now() - 18000000, seller: 'Mike R.', sellerId: 'u3', price: 45, originalPrice: 130, matchScore: 88, verified: true, condition: 'Like New', trustScore: 95, saves: 18, views: 98, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p3', type: 'pair', title: 'Single Cashmere Glove - Left', description: 'Left behind on the subway. Pure cashmere, charcoal gray, women\'s medium. Brand: Everlane.', category: 'Gloves', emoji: '🧤', location: 'Chicago, IL', postedAgo: '1d ago', postedAt: Date.now() - 86400000, seller: 'Lisa M.', sellerId: 'u4', price: 25, originalPrice: 78, matchScore: 91, verified: false, condition: 'Good', trustScore: 82, saves: 12, views: 67, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p4', type: 'pair', title: 'Pearl Stud Earring - Right', description: 'Real freshwater pearl, sterling silver post. Lost the left one. Pearl is about 8mm.', category: 'Earrings', emoji: '🦪', location: 'San Francisco, CA', postedAgo: '3h ago', postedAt: Date.now() - 10800000, seller: 'Emma T.', sellerId: 'u5', price: 40, originalPrice: 150, matchScore: 96, verified: true, condition: 'Excellent', trustScore: 97, saves: 31, views: 203, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p5', type: 'pair', title: 'Left Ray-Ban Aviator Lens', description: 'Cracked my right lens and need a replacement. Classic green Ray-Ban aviators, model RB3025.', category: 'Glasses', emoji: '👓', location: 'Austin, TX', postedAgo: '6h ago', postedAt: Date.now() - 21600000, seller: 'David P.', sellerId: 'u6', price: 30, originalPrice: 163, matchScore: 82, verified: true, condition: 'Good', trustScore: 91, saves: 8, views: 45, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p6', type: 'pair', title: 'Silver Cufflink - Single', description: 'Tiffany & Co. silver cufflink with blue enamel. Gift from my father, looking for the match.', category: 'Cufflinks', emoji: '✨', location: 'Boston, MA', postedAgo: '12h ago', postedAt: Date.now() - 43200000, seller: 'James W.', sellerId: 'u7', price: 65, originalPrice: 225, matchScore: 89, verified: true, condition: 'Excellent', trustScore: 94, saves: 15, views: 89, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p7', type: 'pair', title: 'Left Adidas Ultraboost - Size 9', description: 'Core black Ultraboost 22. Left shoe only. Worn about 10 times. Sole still in great condition.', category: 'Shoes', emoji: '👟', location: 'Portland, OR', postedAgo: '1d ago', postedAt: Date.now() - 90000000, seller: 'Alex N.', sellerId: 'u8', price: 35, originalPrice: 190, matchScore: 85, verified: false, condition: 'Good', trustScore: 85, saves: 11, views: 72, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'p8', type: 'pair', title: 'Diamond Stud Earring - Left', description: '0.25ct diamond, white gold setting. Insurance covered the pair but I want to find the mate.', category: 'Earrings', emoji: '💍', location: 'Miami, FL', postedAgo: '4h ago', postedAt: Date.now() - 14400000, seller: 'Rachel G.', sellerId: 'u9', price: 200, originalPrice: 850, matchScore: 97, verified: true, condition: 'Excellent', trustScore: 99, saves: 42, views: 312, donationOption: false, urgency: 'normal', status: 'active', images: [] },
    ]

    const freeItems: Item[] = [
      { id: 'f1', type: 'free', title: 'IKEA Billy Bookshelf - White', description: 'Moving out! Must go today. Good condition, minor scratches. You pick up from Brooklyn.', category: 'Furniture', emoji: '📚', location: 'Brooklyn, NY', postedAgo: '30m ago', postedAt: Date.now() - 1800000, seller: 'Emma S.', sellerId: 'u10', matchScore: 0, verified: true, condition: 'Good', trustScore: 98, saves: 24, views: 156, donationOption: true, urgency: 'must-go', status: 'active', images: [] },
      { id: 'f2', type: 'free', title: 'Kids Bicycle - Pink, Ages 6-9', description: 'Daughter outgrew this. Still rides great with training wheels and bell.', category: 'Toys', emoji: '🚲', location: 'Austin, TX', postedAgo: '1h ago', postedAt: Date.now() - 3600000, seller: 'Tom B.', sellerId: 'u11', matchScore: 0, verified: true, condition: 'Good', trustScore: 95, saves: 12, views: 89, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'f3', type: 'free', title: 'Box of 20+ Cookbooks', description: 'Downsizing kitchen library. Julia Child, Ina Garten, and more. All good condition.', category: 'Books', emoji: '📖', location: 'Portland, OR', postedAgo: '2h ago', postedAt: Date.now() - 7200000, seller: 'Lisa M.', sellerId: 'u4', matchScore: 0, verified: true, condition: 'Good', trustScore: 92, saves: 31, views: 203, donationOption: true, urgency: 'normal', status: 'active', images: [] },
      { id: 'f4', type: 'free', title: 'Working Panasonic Microwave', description: 'Upgraded to newer model. Works perfectly, 1000W. Just not the newest look.', category: 'Kitchen', emoji: '📦', location: 'Seattle, WA', postedAgo: '3h ago', postedAt: Date.now() - 10800000, seller: 'James P.', sellerId: 'u12', matchScore: 0, verified: true, condition: 'Good', trustScore: 88, saves: 8, views: 45, donationOption: true, urgency: 'high', status: 'active', images: [] },
      { id: 'f5', type: 'free', title: '3 Winter Coats - Women\'s M', description: 'One puffer, one wool, one rain jacket. All clean and ready to wear.', category: 'Clothing', emoji: '🧥', location: 'Denver, CO', postedAgo: '4h ago', postedAt: Date.now() - 14400000, seller: 'Nina K.', sellerId: 'u13', matchScore: 0, verified: true, condition: 'Excellent', trustScore: 96, saves: 19, views: 112, donationOption: true, urgency: 'normal', status: 'active', images: [] },
      { id: 'f6', type: 'free', title: 'Garden Tools Complete Set', description: 'Rake, shovel, pruning shears, trowel, gloves. Some rust but fully functional.', category: 'Garden', emoji: '🌿', location: 'Nashville, TN', postedAgo: '5h ago', postedAt: Date.now() - 18000000, seller: 'Robert H.', sellerId: 'u14', matchScore: 0, verified: false, condition: 'Fair', trustScore: 85, saves: 6, views: 34, donationOption: false, urgency: 'normal', status: 'active', images: [] },
      { id: 'f7', type: 'free', title: 'iPad 2 + Charger', description: 'Still works for browsing and videos. Small screen crack but fully functional.', category: 'Electronics', emoji: '📱', location: 'Phoenix, AZ', postedAgo: '6h ago', postedAt: Date.now() - 21600000, seller: 'Chris D.', sellerId: 'u15', matchScore: 0, verified: true, condition: 'Good', trustScore: 91, saves: 42, views: 287, donationOption: true, urgency: 'high', status: 'active', images: [] },
      { id: 'f8', type: 'free', title: 'Solid Wood Dining Table', description: 'Seats 4 comfortably. Some wear on top but structurally perfect.', category: 'Furniture', emoji: '🪑', location: 'Philadelphia, PA', postedAgo: '8h ago', postedAt: Date.now() - 28800000, seller: 'Maria G.', sellerId: 'u16', matchScore: 0, verified: true, condition: 'Good', trustScore: 94, saves: 15, views: 98, donationOption: true, urgency: 'normal', status: 'active', images: [] },
    ]

    this.setItems([...pairItems, ...freeItems])

    const activities: Activity[] = [
      { id: 'a1', type: 'match', message: 'Sarah K. found the mate for her gold hoop earring!', time: '2m ago', timestamp: Date.now() - 120000, emoji: '💎', userId: 'u2' },
      { id: 'a2', type: 'free', message: 'Tom B. gave away a kids bicycle in Austin', time: '5m ago', timestamp: Date.now() - 300000, emoji: '🚲', userId: 'u11' },
      { id: 'a3', type: 'donation', message: 'Lisa M. donated 20+ cookbooks to local library', time: '12m ago', timestamp: Date.now() - 720000, emoji: '♻️', userId: 'u4' },
      { id: 'a4', type: 'post', message: 'Mike R. posted a right Nike Air Max - Size 10', time: '18m ago', timestamp: Date.now() - 1080000, emoji: '👟', userId: 'u3' },
      { id: 'a5', type: 'match', message: 'Emma T. matched her pearl stud earring!', time: '25m ago', timestamp: Date.now() - 1500000, emoji: '🦪', userId: 'u5' },
      { id: 'a6', type: 'free', message: 'James P. listed a working microwave for free', time: '32m ago', timestamp: Date.now() - 1920000, emoji: '📦', userId: 'u12' },
      { id: 'a7', type: 'donation', message: 'Nina K. donated 3 winter coats to shelter', time: '45m ago', timestamp: Date.now() - 2700000, emoji: '🧥', userId: 'u13' },
      { id: 'a8', type: 'match', message: 'David P. found replacement Ray-Ban lens', time: '1h ago', timestamp: Date.now() - 3600000, emoji: '👓', userId: 'u6' },
    ]
    this.set('activities', activities)
  }

  // ---- Reset ----
  reset(): void {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix))
    keys.forEach(k => localStorage.removeItem(k))
  }
}

export const db = new Database()
