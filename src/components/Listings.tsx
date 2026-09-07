import { useState } from 'react'
import type { Item } from '../lib/db'

interface ListingsProps {
  items: Item[]
  type: 'findapair' | 'freeitem'
  onPostItem: (type: 'pair' | 'free') => void
  onSelectItem: (item: Item) => void
  onToggleWishlist: (itemId: string) => void
  onOpenFilters?: () => void
  selectedItems?: string[]
  onToggleSelect?: (id: string) => void
}

export default function Listings({ items, type, onPostItem, onSelectItem, onToggleWishlist, onOpenFilters, selectedItems = [], onToggleSelect }: ListingsProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = type === 'findapair' 
    ? ['All', 'Earrings', 'Shoes', 'Gloves', 'Watches', 'Glasses']
    : ['All', 'Furniture', 'Electronics', 'Clothing', 'Books', 'Kitchen']

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                       item.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    return matchSearch && matchCategory
  })

  return (
    <section className="py-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {onOpenFilters && (
          <button
            onClick={onOpenFilters}
            className="px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        )}
        <button
          onClick={() => onPostItem(type === 'findapair' ? 'pair' : 'free')}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all whitespace-nowrap"
        >
          + Post Item
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'bg-zinc-900/30 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-zinc-500 text-sm">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{item.emoji}</div>
                <div className="flex gap-1.5">
                  {type === 'findapair' && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                      {item.matchScore}%
                    </span>
                  )}
                  {type === 'freeitem' && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      FREE
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{item.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-[9px] font-bold text-black">
                    {item.seller[0]}
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">{item.seller}</div>
                    <div className="text-[10px] text-zinc-600">{item.location.split(',')[0]}</div>
                  </div>
                </div>
                {type === 'findapair' && item.price && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-cyan-400">${item.price}</div>
                    {item.originalPrice && (
                      <div className="text-[10px] text-zinc-600 line-through">${item.originalPrice}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
