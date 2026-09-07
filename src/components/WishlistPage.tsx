import { useState, useEffect } from 'react'
import { db } from '../lib/db'
import type { Item } from '../lib/db'

interface WishlistPageProps {
  isOpen: boolean
  onClose: () => void
  onSelectItem: (item: Item) => void
  onRemoveFromWishlist: (itemId: string) => void
}

export default function WishlistPage({ isOpen, onClose, onSelectItem, onRemoveFromWishlist }: WishlistPageProps) {
  const [wishlistItems, setWishlistItems] = useState<Item[]>([])
  const [filter, setFilter] = useState<'all' | 'pair' | 'free'>('all')

  useEffect(() => {
    if (isOpen) {
      loadWishlist()
    }
  }, [isOpen])

  const loadWishlist = () => {
    const user = db.getCurrentUser()
    const items = user.wishlist
      .map(id => db.getItem(id))
      .filter((item): item is Item => item !== undefined)
    setWishlistItems(items)
  }

  const filteredItems = wishlistItems.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">❤️ My Wishlist</h3>
            <p className="text-xs text-zinc-500">{wishlistItems.length} saved items</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 border-b border-zinc-800 flex gap-2">
          {(['all', 'pair', 'free'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === f
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {f === 'all' ? 'All' : f === 'pair' ? 'Find a Pair' : 'FreeItem'}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🤍</div>
              <p className="text-sm text-zinc-500">Your wishlist is empty</p>
              <p className="text-xs text-zinc-600 mt-1">Save items you're interested in</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{item.emoji}</div>
                    <button
                      onClick={() => {
                        onRemoveFromWishlist(item.id)
                        setWishlistItems(wishlistItems.filter(i => i.id !== item.id))
                      }}
                      className="text-zinc-500 hover:text-red-400 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-cyan-400">
                      {item.type === 'pair' ? `$${item.price}` : 'FREE'}
                    </div>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
