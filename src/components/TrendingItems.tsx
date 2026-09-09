import type { Item } from '../lib/db'

interface TrendingItemsProps {
  items: Item[]
  onSelectItem: (item: Item) => void
}

export default function TrendingItems({ items, onSelectItem }: TrendingItemsProps) {
  // Sort by views + saves to get trending items
  const trending = [...items]
    .sort((a, b) => (b.views + b.saves) - (a.views + a.saves))
    .slice(0, 5)

  if (trending.length === 0) {
    return null
  }

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-400">🔥 Trending Now</h3>
        <span className="text-[10px] text-zinc-600">Updated hourly</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {trending.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-3 hover:border-cyan-500/30 transition-all text-left relative overflow-hidden group"
          >
            {/* Rank badge */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-cyan-400">#{index + 1}</span>
            </div>
            
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
            <div className="text-xs font-medium text-white truncate mb-1">{item.title}</div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-zinc-500">
                {item.type === 'pair' ? `$${item.price}` : 'FREE'}
              </div>
              <div className="text-[10px] text-zinc-600">
                {item.views + item.saves} views
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
