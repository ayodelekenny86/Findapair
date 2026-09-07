import { useState } from 'react'
import type { Toast } from './Toast'
import type { Item } from '../lib/db'

interface FindAPairSectionProps {
  items: Item[]
  onPostItem: (type: 'pair' | 'free') => void
  addToast?: (toast: Omit<Toast, 'id'>) => void
  onSelectItem?: (item: Item) => void
  onToggleWishlist?: (itemId: string) => void
  onOpenFilters?: () => void
}

const categories = [
  { name: 'All', icon: '🔍' },
  { name: 'Earrings', icon: '💎' },
  { name: 'Shoes', icon: '👠' },
  { name: 'Gloves', icon: '🧤' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Glasses', icon: '👓' },
  { name: 'Cufflinks', icon: '✨' },
]

export default function FindAPairSection({ items, onPostItem, addToast, onSelectItem, onToggleWishlist, onOpenFilters }: FindAPairSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('match')

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0)
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0)
    return 0
  })

  return (
    <section id="listings" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <span className="eyebrow mb-3 block">Browse listings</span>
          <h2 className="heading-lg mb-3">
            Find the <span className="gradient-text">mate</span>
          </h2>
          <p className="text-body max-w-xl">
            Cheaper than buying new. Someone out there has the other half of what you lost.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="panel p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by item, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !pl-11"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field !w-auto md:!w-44"
            >
              <option value="match">Best match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest first</option>
            </select>
            <button
              onClick={() => onOpenFilters?.()}
              className="btn-secondary whitespace-nowrap"
            >
              ⚙️ Filters
            </button>
            <button
              onClick={() => onPostItem('pair')}
              className="btn-primary whitespace-nowrap"
            >
              + Post item
            </button>
          </div>

          {searchQuery && (
            <div className="mt-4 px-4 py-3 rounded-lg flex items-center gap-3" style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <span className="text-cyan-400 text-sm">✨</span>
              <p className="text-[13px] text-cyan-300">
                <strong>AI Match:</strong> Found {filteredItems.length} potential matches based on your search.
              </p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'text-cyan-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={selectedCategory === cat.name ? {
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              } : {
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card card-interactive group"
              onClick={() => onSelectItem?.(item)}
            >
              {/* Image Area */}
              <div className="h-36 rounded-lg flex items-center justify-center relative mb-4" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(6, 182, 212, 0.02))' }}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                
                {/* Match Score */}
                <div className="absolute top-3 left-3 badge badge-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {item.matchScore}% match
                </div>

                {/* Wishlist */}
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(item.id); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span className="text-xs">🤍</span>
                </button>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-[14px] font-semibold text-white leading-tight">{item.title}</h3>
                  {item.verified && (
                    <span className="badge badge-success !text-[10px] !py-0.5 !px-2 flex-shrink-0">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-zinc-500 mb-3 line-clamp-2">{item.description}</p>

                {/* Match Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-zinc-500">Match confidence</span>
                    <span className="text-cyan-400 font-semibold">{item.matchScore}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="match-bar h-full" style={{ width: `${item.matchScore}%` }}></div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-white">${item.price}</span>
                  <span className="text-[12px] text-zinc-600 line-through">${item.originalPrice}</span>
                  <span className="text-[11px] text-emerald-400 ml-auto font-medium">
                    Save {Math.round((1 - (item.price || 0) / (item.originalPrice || 1)) * 100)}%
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
                      {item.seller[0]}
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-400 block leading-tight">{item.seller}</span>
                      <span className="text-[10px] text-zinc-600">📍 {item.location.split(',')[0]}</span>
                    </div>
                  </div>
                  <button className="text-[11px] text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                    View →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 panel">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-zinc-400">No items found. Try adjusting your search.</p>
            <button onClick={() => onPostItem('pair')} className="btn-secondary mt-4">
              Post what you're looking for
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
