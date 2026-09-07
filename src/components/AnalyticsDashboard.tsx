import { useState, useEffect } from 'react'
import { db } from '../lib/db'
import { aiEngine } from '../lib/ai'
import { gamificationService } from '../lib/gamification'

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [level, setLevel] = useState<any>(null)
  const [levelProgress, setLevelProgress] = useState<any>(null)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = () => {
    const user = db.getCurrentUser()
    const items = db.getItems()
    const userItems = items.filter(i => i.sellerId === user.id)

    // Calculate stats
    const totalViews = userItems.reduce((sum, i) => sum + i.views, 0)
    const totalSaves = userItems.reduce((sum, i) => sum + i.saves, 0)
    const matchedItems = userItems.filter(i => i.status === 'matched').length
    const conversionRate = userItems.length > 0 
      ? ((matchedItems / userItems.length) * 100).toFixed(1)
      : '0'

    // Category breakdown
    const categoryBreakdown = userItems.reduce((acc: any, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {})

    // Price predictions
    const pricePredictions = userItems.slice(0, 3).map(item => ({
      item: item.title,
      prediction: aiEngine.predictPrice(item),
      currentPrice: item.price,
    }))

    // Get recommendations
    const recs = aiEngine.getRecommendations(user.id, 5)

    // Get level info
    const userLevel = gamificationService.getUserLevel(user.points)
    const progress = gamificationService.getLevelProgress(user.points)

    setStats({
      totalItems: userItems.length,
      totalViews,
      totalSaves,
      matchedItems,
      conversionRate,
      categoryBreakdown,
      pricePredictions,
    })

    setRecommendations(recs)
    setLevel(userLevel)
    setLevelProgress(progress)
  }

  if (!stats || !level) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Level Card */}
      <div className="panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{level.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-white">{level.title}</h3>
              <p className="text-sm text-zinc-400">Level {level.level}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">{levelProgress.current}%</div>
            <p className="text-xs text-zinc-500">to Level {levelProgress.next}</p>
          </div>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${levelProgress.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="panel p-4">
          <div className="text-2xl font-bold text-white">{stats.totalItems}</div>
          <div className="text-sm text-zinc-400">Items Posted</div>
        </div>
        <div className="panel p-4">
          <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
          <div className="text-sm text-zinc-400">Total Views</div>
        </div>
        <div className="panel p-4">
          <div className="text-2xl font-bold text-white">{stats.totalSaves}</div>
          <div className="text-sm text-zinc-400">Times Saved</div>
        </div>
        <div className="panel p-4">
          <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
          <div className="text-sm text-zinc-400">Match Rate</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="panel p-6">
        <h3 className="text-lg font-bold text-white mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(stats.categoryBreakdown).map(([category, count]: [string, any]) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-300">{category}</span>
                <span className="text-zinc-400">{count} items</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${(count / stats.totalItems) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Predictions */}
      {stats.pricePredictions.length > 0 && (
        <div className="panel p-6">
          <h3 className="text-lg font-bold text-white mb-4">AI Price Predictions</h3>
          <div className="space-y-4">
            {stats.pricePredictions.map((pred: any, idx: number) => (
              <div key={idx} className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="font-medium text-white mb-2">{pred.item}</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-zinc-400">Min</div>
                    <div className="text-green-400 font-bold">${pred.prediction.min}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Suggested</div>
                    <div className="text-cyan-400 font-bold">${pred.prediction.suggested}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Max</div>
                    <div className="text-red-400 font-bold">${pred.prediction.max}</div>
                  </div>
                </div>
                {pred.currentPrice && (
                  <div className="mt-2 text-xs text-zinc-500">
                    Current: ${pred.currentPrice}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="panel p-6">
          <h3 className="text-lg font-bold text-white mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec: any, idx: number) => {
              const item = db.getItem(rec.itemId)
              if (!item) return null

              return (
                <div key={idx} className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-sm text-zinc-400">{rec.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-bold">{(rec.confidence * 100).toFixed(0)}%</div>
                    <div className="text-xs text-zinc-500">match</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
