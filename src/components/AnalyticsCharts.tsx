import { useEffect, useState } from 'react'
import { db } from '../lib/db'

export default function AnalyticsCharts() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalViews: 0,
    totalSaves: 0,
    categoryBreakdown: {} as Record<string, number>,
    priceDistribution: [] as number[],
    matchRate: 0,
  })

  useEffect(() => {
    const user = db.getCurrentUser()
    const items = db.getItems().filter(i => i.sellerId === user.id)

    const totalViews = items.reduce((sum, i) => sum + i.views, 0)
    const totalSaves = items.reduce((sum, i) => sum + i.saves, 0)
    const matchedItems = items.filter(i => i.status === 'matched').length
    const matchRate = items.length > 0 ? (matchedItems / items.length) * 100 : 0

    const categoryBreakdown = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const priceDistribution = items
      .map(i => i.price || 0)
      .filter(p => p > 0)

    setStats({
      totalItems: items.length,
      totalViews,
      totalSaves,
      categoryBreakdown,
      priceDistribution,
      matchRate,
    })
  }, [])

  const maxCategoryCount = Math.max(...Object.values(stats.categoryBreakdown), 1)

  return (
    <section className="py-8">
      <h3 className="text-sm font-semibold text-zinc-400 mb-4">📊 Your Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Breakdown */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-zinc-500 mb-3">Category Breakdown</h4>
          {Object.keys(stats.categoryBreakdown).length === 0 ? (
            <p className="text-xs text-zinc-600 text-center py-4">No data yet</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{category}</span>
                    <span className="text-zinc-500">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                      style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Match Rate */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-zinc-500 mb-3">Match Rate</h4>
          <div className="flex items-center justify-center h-32">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-zinc-800"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-cyan-400"
                  strokeDasharray={`${(stats.matchRate / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{stats.matchRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 text-center mt-2">
            {stats.totalItems > 0 ? `${Math.round(stats.totalItems * stats.matchRate / 100)} of ${stats.totalItems} items matched` : 'No items yet'}
          </p>
        </div>
      </div>
    </section>
  )
}
