import { useState } from 'react'

export default function PriceHistoryChart() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Simulated price history data
  const priceData = {
    '7d': [85, 82, 80, 78, 85, 83, 85],
    '30d': [90, 88, 85, 82, 80, 78, 82, 85, 83, 80, 78, 82, 85, 83, 85, 88, 85, 82, 80, 78, 82, 85, 83, 80, 78, 82, 85, 83, 80, 85],
    '90d': [95, 92, 90, 88, 85, 82, 80, 78, 82, 85, 83, 80, 78, 82, 85, 88, 85, 82, 80, 78, 82, 85, 83, 80, 78, 82, 85, 83, 80, 85],
    '1y': [120, 115, 110, 105, 100, 95, 90, 85, 82, 80, 78, 82],
  }

  const data = priceData[timeRange]
  const maxPrice = Math.max(...data)
  const minPrice = Math.min(...data)
  const currentPrice = data[data.length - 1]
  const priceChange = currentPrice - data[0]
  const priceChangePercent = ((priceChange / data[0]) * 100).toFixed(1)

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-[14px] font-semibold text-white mb-1">Price History</h4>
          <p className="text-[12px] text-zinc-500">Gold Hoop Earring - 14k</p>
        </div>
        <div className="text-right">
          <p className="text-[20px] font-bold text-white">${currentPrice}</p>
          <p className={`text-[12px] ${priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '↑' : '↓'} ${Math.abs(priceChange)} ({priceChangePercent}%)
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
        {(['7d', '30d', '90d', '1y'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex-1 py-1.5 rounded-md text-[12px] font-medium transition-all ${
              timeRange === range ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            style={timeRange === range ? { background: 'rgba(255,255,255,0.08)' } : {}}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 12.5}
              x2="100"
              y2={i * 12.5}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.2"
            />
          ))}
          
          {/* Price line */}
          <polyline
            points={data.map((price, i) => {
              const x = (i / (data.length - 1)) * 100
              const y = 50 - ((price - minPrice) / (maxPrice - minPrice)) * 50
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Gradient fill */}
          <polygon
            points={[
              ...data.map((price, i) => {
                const x = (i / (data.length - 1)) * 100
                const y = 50 - ((price - minPrice) / (maxPrice - minPrice)) * 50
                return `${x},${y}`
              }),
              '100,50',
              '0,50',
            ].join(' ')}
            fill="url(#gradientFill)"
            opacity="0.3"
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Price Range */}
      <div className="flex justify-between text-[11px] text-zinc-600">
        <span>Min: ${minPrice}</span>
        <span>Avg: ${Math.round(data.reduce((a, b) => a + b) / data.length)}</span>
        <span>Max: ${maxPrice}</span>
      </div>
    </div>
  )
}
