// AI-powered recommendation engine
import { db } from './db'
import type { Item } from './db'

interface Recommendation {
  itemId: string
  score: number
  reason: string
  confidence: number
}

class AIEngine {
  // Calculate similarity between two items
  private calculateSimilarity(item1: Item, item2: Item): number {
    let score = 0

    // Category match (40% weight)
    if (item1.category === item2.category) score += 40

    // Price similarity (20% weight)
    if (item1.price && item2.price) {
      const priceDiff = Math.abs(item1.price - item2.price)
      const avgPrice = (item1.price + item2.price) / 2
      const priceSimilarity = Math.max(0, 100 - (priceDiff / avgPrice) * 100)
      score += priceSimilarity * 0.2
    }

    // Location proximity (20% weight)
    if (item1.location === item2.location) score += 20

    // Condition match (10% weight)
    if (item1.condition === item2.condition) score += 10

    // Time recency (10% weight)
    const timeDiff = Math.abs(item1.postedAt - item2.postedAt)
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
    if (daysDiff < 7) score += 10
    else if (daysDiff < 30) score += 5

    return Math.min(100, score)
  }

  // Get personalized recommendations for a user
  getRecommendations(userId: string, limit: number = 10): Recommendation[] {
    const user = db.getCurrentUser()
    if (!user || user.id !== userId) return []

    const allItems = db.getItems()
    const userItems = allItems.filter(item => item.sellerId === userId)
    const otherItems = allItems.filter(item => item.sellerId !== userId)

    const recommendations: Recommendation[] = []

    for (const otherItem of otherItems) {
      let bestMatchScore = 0
      let bestMatchItem: Item | null = null

      for (const userItem of userItems) {
        const similarity = this.calculateSimilarity(userItem, otherItem)
        if (similarity > bestMatchScore) {
          bestMatchScore = similarity
          bestMatchItem = userItem
        }
      }

      if (bestMatchScore > 50 && bestMatchItem) {
        recommendations.push({
          itemId: otherItem.id,
          score: bestMatchScore,
          reason: this.generateReason(bestMatchItem, otherItem),
          confidence: bestMatchScore / 100,
        })
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  // Generate human-readable reason for recommendation
  private generateReason(item1: Item, item2: Item): string {
    const reasons: string[] = []

    if (item1.category === item2.category) {
      reasons.push(`Same category: ${item1.category}`)
    }

    if (item1.location === item2.location) {
      reasons.push('Same location')
    }

    if (item1.condition === item2.condition) {
      reasons.push(`Similar condition: ${item1.condition}`)
    }

    if (reasons.length === 0) {
      reasons.push('High compatibility match')
    }

    return reasons.join(', ')
  }

  // Predict optimal price for an item
  predictPrice(item: Partial<Item>): { min: number; max: number; suggested: number } {
    const similarItems = db.getItems().filter(
      i => i.category === item.category && i.condition === item.condition
    )

    if (similarItems.length === 0) {
      return { min: 20, max: 100, suggested: 50 }
    }

    const prices = similarItems
      .map(i => i.price)
      .filter((p): p is number => p !== undefined && p > 0)

    if (prices.length === 0) {
      return { min: 20, max: 100, suggested: 50 }
    }

    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return {
      min: Math.round(minPrice * 0.9),
      max: Math.round(maxPrice * 1.1),
      suggested: Math.round(avgPrice),
    }
  }

  // Detect potential matches using AI
  detectMatches(): Array<{ item1: string; item2: string; confidence: number }> {
    const items = db.getItems()
    const matches: Array<{ item1: string; item2: string; confidence: number }> = []

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const similarity = this.calculateSimilarity(items[i], items[j])
        if (similarity > 80) {
          matches.push({
            item1: items[i].id,
            item2: items[j].id,
            confidence: similarity / 100,
          })
        }
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence)
  }
}

export const aiEngine = new AIEngine()
