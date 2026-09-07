import { useState } from 'react'
import type { Toast } from './Toast'
import type { Item } from '../lib/db'

interface FreeItemNetworkProps {
  items: Item[]
  onPostItem: (type: 'pair' | 'free') => void
  addToast?: (toast: Omit<Toast, 'id'>) => void
  onSelectItem?: (item: Item) => void
  onToggleWishlist?: (itemId: string) => void
}

const freeCategories = [
  { name: 'All', icon: '🎁' },
  { name: 'Furniture', icon: '🪑' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Clothing', icon: '👕' },
  { name: 'Books', icon: '📚' },
  { name: 'Kitchen', icon: '🍳' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Garden', icon: '🌱' },
]

export default function FreeItemNetwork({ items, onPostItem, onSelectItem, onToggleWishlist }: FreeItemNetworkProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="listings" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <span className="eyebrow mb-3 block">FreeItem Network</span>
          <h2 className="heading-lg mb-3">
            Give away, <span className="gradient-text">for free</span>
          </h2>
          <p className="text-body max-w-xl">
            One person's trash is another person's treasure. Everything is 100% free. No money ever changes hands.
          </p>
        </div>

        <div className="panel p-4 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2 flex-1">
            <span className="badge badge-success">✓ Free</span>
            <span className="badge badge-success">✓ Legal</span>
            <span className="badge badge-success">✓ All ages</span>
          </div>
          <button onClick={() => onPostItem('free')} className="btn-primary !text-[13px] whitespace-nowrap">
            + Give something free
          </button>
        </div>

        <div className="panel p-5 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search free items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field !pl-11"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {freeCategories.map((cat) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="card card-interactive group" onClick={() => onSelectItem?.(item)}>
              <div className="h-32 rounded-lg flex items-center justify-center relative mb-4" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.02))' }}>
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                
                <div className="absolute top-3 left-3 badge badge-success">FREE</div>

                {item.urgency === 'must-go' && (
                  <div className="absolute top-3 right-3 badge badge-danger">🔥 Must go</div>
                )}
                {item.urgency === 'high' && (
                  <div className="absolute top-3 right-3 badge badge-warning">⚡ Urgent</div>
                )}
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-white leading-tight mb-1.5">{item.title}</h3>
                <p className="text-[12px] text-zinc-500 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] text-zinc-500">Trust:</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i < Math.round(item.trustScore / 20) ? '#06b6d4' : 'rgba(255,255,255,0.1)' }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[11px] text-cyan-400 font-semibold">{item.trustScore}</span>
                  <span className="text-[10px] text-zinc-600 ml-auto">❤️ {item.saves}</span>
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                      {item.seller[0]}
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-400 block leading-tight">{item.seller}</span>
                      <span className="text-[10px] text-zinc-600">📍 {item.location.split(',')[0]}</span>
                    </div>
                  </div>
                  <button className="text-[11px] text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                    Claim →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 panel">
            <span className="text-4xl mb-4 block">🎁</span>
            <p className="text-zinc-400">No items found. Try a different category.</p>
          </div>
        )}

        <div className="panel p-6 mt-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-4xl">♻️</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="heading-md mb-1">Give to a non-profit</h3>
            <p className="text-[13px] text-zinc-500">
              Tag your item for donation. Help reduce waste while helping those in need.
            </p>
          </div>
          <button onClick={() => onPostItem('free')} className="btn-secondary whitespace-nowrap">
            Donate an item →
          </button>
        </div>
      </div>
    </section>
  )
}
