import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface RecentlyViewedProps {
  onSelectItem: (item: Item) => void
}

export function addToRecentlyViewed(item: Item) {
  const stored = localStorage.getItem('recentlyViewed')
  const current = stored ? JSON.parse(stored) : []
  const updated = [item, ...current.filter((i: Item) => i.id !== item.id)].slice(0, 6)
  localStorage.setItem('recentlyViewed', JSON.stringify(updated))
}

export default function RecentlyViewed({ onSelectItem }: RecentlyViewedProps) {
  const [recentItems, setRecentItems] = useState<Item[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed')
    if (stored) {
      setRecentItems(JSON.parse(stored))
    }
  }, [])

  if (recentItems.length === 0) {
    return null
  }

  return (
    <section className="py-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">Recently Viewed</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {recentItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="flex-shrink-0 w-32 bg-zinc-900/30 border border-zinc-800 rounded-lg p-3 hover:border-cyan-500/30 transition-all text-left"
          >
            <div className="text-2xl mb-2">{item.emoji}</div>
            <div className="text-xs font-medium text-white truncate">{item.title}</div>
            <div className="text-[10px] text-zinc-500 mt-1">
              {item.type === 'pair' ? `$${item.price}` : 'FREE'}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
