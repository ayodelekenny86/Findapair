import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface ItemDetailProps {
  item: Item
  onClose: () => void
  onToggleWishlist: (itemId: string) => void
  isWishlisted: boolean
}

export default function ItemDetail({ item, onClose, onToggleWishlist, isWishlisted }: ItemDetailProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'seller' | 'similar'>('details')
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out: ${item.title}`
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${url}`)
        break
    }
    setShowShareMenu(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-zinc-500">Posted {item.postedAgo}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image/Emoji Display */}
          <div className="h-48 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10">
            <span className="text-7xl">{item.emoji}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => onToggleWishlist(item.id)}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isWishlisted 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                  : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-600'
              }`}
            >
              {isWishlisted ? '❤️ Saved' : '🤍 Save'}
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-4 py-2.5 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg text-sm font-medium hover:border-zinc-600 transition-all"
              >
                📤 Share
              </button>
              {showShareMenu && (
                <div className="absolute top-full mt-2 right-0 bg-zinc-800 border border-zinc-700 rounded-lg py-1 min-w-[140px]">
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">𝕏 Twitter</button>
                  <button onClick={() => handleShare('copy')} className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">🔗 Copy Link</button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 p-1 bg-zinc-800/50 rounded-lg">
            {(['details', 'seller', 'similar'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                  activeTab === tab ? 'text-white bg-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Category</p>
                  <p className="text-sm text-white font-medium">{item.category}</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Condition</p>
                  <p className="text-sm text-white font-medium">{item.condition}</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm text-white font-medium">📍 {item.location}</p>
                </div>
                {item.price && (
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Price</p>
                    <p className="text-sm text-cyan-400 font-bold">${item.price} {item.originalPrice && <span className="text-xs text-zinc-600 line-through">${item.originalPrice}</span>}</p>
                  </div>
                )}
              </div>

              {item.matchScore && (
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-400">Match Confidence</span>
                    <span className="text-cyan-400 font-semibold">{item.matchScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: `${item.matchScore}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-lg font-bold text-black">
                    {item.seller[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.seller}</h4>
                    <p className="text-xs text-zinc-500">Member since 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-zinc-900/50 rounded">
                    <p className="text-lg font-bold text-cyan-400">{item.trustScore}</p>
                    <p className="text-[10px] text-zinc-500">Trust</p>
                  </div>
                  <div className="text-center p-2 bg-zinc-900/50 rounded">
                    <p className="text-lg font-bold text-cyan-400">4.9</p>
                    <p className="text-[10px] text-zinc-500">Rating</p>
                  </div>
                  <div className="text-center p-2 bg-zinc-900/50 rounded">
                    <p className="text-lg font-bold text-cyan-400">23</p>
                    <p className="text-[10px] text-zinc-500">Items</p>
                  </div>
                </div>

                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all">
                  💬 Message Seller
                </button>
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 mb-3">You might also like:</p>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-zinc-800/50 rounded-lg flex items-center gap-3 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded bg-cyan-500/10 flex items-center justify-center text-xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white mb-0.5">Similar Item {i}</h4>
                    <p className="text-xs text-zinc-500">92% match • {item.location}</p>
                  </div>
                  <button className="text-xs text-cyan-400 font-medium">View →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
