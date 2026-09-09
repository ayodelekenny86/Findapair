// Gamification system with levels, badges, and achievements
import { db } from './db'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'posting' | 'matching' | 'social' | 'eco' | 'special'
  requirement: number
  type: 'items_posted' | 'items_matched' | 'items_given' | 'trust_score' | 'referrals' | 'days_active' | 'eco_impact'
  unlocked: boolean
  unlockedAt?: number
  points: number
}

export interface UserLevel {
  level: number
  title: string
  minPoints: number
  maxPoints: number
  color: string
  icon: string
}

export const LEVELS: UserLevel[] = [
  { level: 1, title: 'Newcomer', minPoints: 0, maxPoints: 99, color: '#94a3b8', icon: '🌱' },
  { level: 2, title: 'Explorer', minPoints: 100, maxPoints: 299, color: '#3b82f6', icon: '🧭' },
  { level: 3, title: 'Contributor', minPoints: 300, maxPoints: 599, color: '#8b5cf6', icon: '⭐' },
  { level: 4, title: 'Champion', minPoints: 600, maxPoints: 999, color: '#ec4899', icon: '🏆' },
  { level: 5, title: 'Legend', minPoints: 1000, maxPoints: 1999, color: '#f59e0b', icon: '👑' },
  { level: 6, title: 'Master', minPoints: 2000, maxPoints: 4999, color: '#10b981', icon: '💎' },
  { level: 7, title: 'Grandmaster', minPoints: 5000, maxPoints: 9999, color: '#ef4444', icon: '🔥' },
  { level: 8, title: 'Mythic', minPoints: 10000, maxPoints: Infinity, color: '#06b6d4', icon: '✨' },
]

export const ACHIEVEMENTS: Achievement[] = [
  // Posting achievements
  {
    id: 'first_post',
    title: 'First Steps',
    description: 'Post your first item',
    icon: '📝',
    category: 'posting',
    requirement: 1,
    type: 'items_posted',
    unlocked: false,
    points: 10,
  },
  {
    id: 'prolific_poster',
    title: 'Prolific Poster',
    description: 'Post 10 items',
    icon: '📚',
    category: 'posting',
    requirement: 10,
    type: 'items_posted',
    unlocked: false,
    points: 50,
  },
  {
    id: 'master_poster',
    title: 'Master Poster',
    description: 'Post 50 items',
    icon: '🎯',
    category: 'posting',
    requirement: 50,
    type: 'items_posted',
    unlocked: false,
    points: 200,
  },

  // Matching achievements
  {
    id: 'first_match',
    title: 'Perfect Match',
    description: 'Find your first match',
    icon: '🎉',
    category: 'matching',
    requirement: 1,
    type: 'items_matched',
    unlocked: false,
    points: 25,
  },
  {
    id: 'match_maker',
    title: 'Match Maker',
    description: 'Complete 10 matches',
    icon: '💕',
    category: 'matching',
    requirement: 10,
    type: 'items_matched',
    unlocked: false,
    points: 100,
  },
  {
    id: 'match_master',
    title: 'Match Master',
    description: 'Complete 50 matches',
    icon: '🏅',
    category: 'matching',
    requirement: 50,
    type: 'items_matched',
    unlocked: false,
    points: 500,
  },

  // Social achievements
  {
    id: 'generous_giver',
    title: 'Generous Giver',
    description: 'Give away 5 items for free',
    icon: '🎁',
    category: 'social',
    requirement: 5,
    type: 'items_given',
    unlocked: false,
    points: 75,
  },
  {
    id: 'philanthropist',
    title: 'Philanthropist',
    description: 'Give away 25 items for free',
    icon: '❤️',
    category: 'social',
    requirement: 25,
    type: 'items_given',
    unlocked: false,
    points: 300,
  },
  {
    id: 'trusted_member',
    title: 'Trusted Member',
    description: 'Reach 90+ trust score',
    icon: '🛡️',
    category: 'social',
    requirement: 90,
    type: 'trust_score',
    unlocked: false,
    points: 150,
  },

  // Referral achievements
  {
    id: 'first_referral',
    title: 'Friend Inviter',
    description: 'Refer your first friend',
    icon: '👥',
    category: 'social',
    requirement: 1,
    type: 'referrals',
    unlocked: false,
    points: 20,
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Refer 10 friends',
    icon: '🦋',
    category: 'social',
    requirement: 10,
    type: 'referrals',
    unlocked: false,
    points: 150,
  },

  // Eco achievements
  {
    id: 'eco_warrior',
    title: 'Eco Warrior',
    description: 'Prevent 1kg of waste',
    icon: '♻️',
    category: 'eco',
    requirement: 1,
    type: 'eco_impact',
    unlocked: false,
    points: 30,
  },
  {
    id: 'planet_saver',
    title: 'Planet Saver',
    description: 'Prevent 10kg of waste',
    icon: '🌍',
    category: 'eco',
    requirement: 10,
    type: 'eco_impact',
    unlocked: false,
    points: 200,
  },
]

class GamificationService {
  // Get user's current level
  getUserLevel(points: number): UserLevel {
    return LEVELS.find(level => points >= level.minPoints && points < level.maxPoints) || LEVELS[0]
  }

  // Get progress to next level
  getLevelProgress(points: number): { current: number; next: number; progress: number } {
    const currentLevel = this.getUserLevel(points)
    const nextLevel = LEVELS[currentLevel.level] || currentLevel
    
    const progress = ((points - currentLevel.minPoints) / (currentLevel.maxPoints - currentLevel.minPoints)) * 100
    
    return {
      current: currentLevel.level,
      next: nextLevel.level,
      progress: Math.min(100, Math.max(0, progress)),
    }
  }

  // Check and unlock achievements
  checkAchievements(): Achievement[] {
    const user = db.getCurrentUser()
    const unlockedAchievements: Achievement[] = []

    for (const achievement of ACHIEVEMENTS) {
      let currentValue = 0

      switch (achievement.type) {
        case 'items_posted':
          currentValue = user.itemsPosted
          break
        case 'items_matched':
          currentValue = user.itemsMatched
          break
        case 'items_given':
          currentValue = user.itemsGiven
          break
        case 'trust_score':
          currentValue = user.trustScore
          break
        case 'referrals':
          currentValue = db.getReferrals().filter(r => r.referrerId === user.id).length
          break
        case 'eco_impact':
          // Calculate eco impact from items
          const items = db.getItems().filter(i => i.sellerId === user.id)
          currentValue = items.length * 0.5 // 0.5kg per item
          break
      }

      if (currentValue >= achievement.requirement && !achievement.unlocked) {
        achievement.unlocked = true
        achievement.unlockedAt = Date.now()
        unlockedAchievements.push(achievement)

        // Award points
        db.updateCurrentUser({ points: user.points + achievement.points })
      }
    }

    return unlockedAchievements
  }

  // Get all achievements with current status
  getAllAchievements(): Achievement[] {
    const user = db.getCurrentUser()
    const achievements = [...ACHIEVEMENTS]

    // Update achievement status based on user stats
    for (const achievement of achievements) {
      let currentValue = 0

      switch (achievement.type) {
        case 'items_posted':
          currentValue = user.itemsPosted
          break
        case 'items_matched':
          currentValue = user.itemsMatched
          break
        case 'items_given':
          currentValue = user.itemsGiven
          break
        case 'trust_score':
          currentValue = user.trustScore
          break
        case 'referrals':
          currentValue = db.getReferrals().filter(r => r.referrerId === user.id).length
          break
        case 'eco_impact':
          const items = db.getItems().filter(i => i.sellerId === user.id)
          currentValue = items.length * 0.5
          break
      }

      achievement.unlocked = currentValue >= achievement.requirement
    }

    return achievements
  }

  // Award points for action
  awardPoints(action: string): number {
    const user = db.getCurrentUser()
    let points = 0

    switch (action) {
      case 'post_item':
        points = 5
        break
      case 'match_item':
        points = 15
        break
      case 'give_free':
        points = 10
        break
      case 'refer_friend':
        points = 20
        break
      case 'daily_login':
        points = 2
        break
      case 'complete_profile':
        points = 25
        break
    }

    if (points > 0) {
      db.updateCurrentUser({ points: user.points + points })
    }

    return points
  }

  // Get leaderboard
  getLeaderboard(limit: number = 10): Array<{ userId: string; name: string; points: number; level: number }> {
    // In a real app, this would fetch from a users collection
    // For now, return current user's stats
    const user = db.getCurrentUser()
    const level = this.getUserLevel(user.points)

    return [
      {
        userId: user.id,
        name: user.name,
        points: user.points,
        level: level.level,
      },
    ]
  }
}

export const gamificationService = new GamificationService()
