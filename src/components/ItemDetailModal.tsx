import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'
import type { Toast } from './Toast'

interface ItemDetailModalProps {
  item: Item
  type: 'pair' | 'free'
  onClose: () => void
  onToggleWishlist?: (itemId: string) => void
  addToast?: (toast: Omit<Toast, 'id'>) => void
}

export default function ItemDetailModal({ item, type, onClose }: ItemDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'seller' | 'similar'>('details')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    import('../lib/db').then((module) => {
      const user = module.db.getCurrentUser()
      setIsWishlisted(user.wishlist.includes(item.id))
    })
  }, [item.id])

  const toggleWishlist = async () => {
    const { userApi } = await import('../lib/api')
    const response = await userApi.toggleWishlist(item.id)
    if (response.success && response.data) {
      setIsWishlisted(response.data.added)
    }
  }

  const shareItem = (platform: string) => {
    const url = window.location.href
    const text = `Check out this ${type === 'pair' ? 'solo item' : 'free item'}: ${item.title}`
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${url}`)
        alert('Link copied to clipboard!')
        break
    }
    setShowShareMenu(false)
  }

  const reportItem = () => {
    if (confirm('Are you sure you want to report this item?')) {
      alert('Thank you for your report. Our team will review this item shortly.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="panel-elevated max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 flex items-center justify-between" style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <h3 className="text-[18px] font-semibold text-white">{item.title}</h3>
              <p className="text-[12px] text-zinc-500">Posted {item.postedAgo}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">✕</button>
        </div>

        <div className="p-6">
          {/* Image/Emoji Display */}
          <div className="h-64 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.05))' }}>
            <span className="text-8xl">{item.emoji}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button onClick={toggleWishlist} className={`flex-1 btn-secondary !text-[13px] ${isWishlisted ? '!border-red-500/30 !text-red-400' : ''}`}>
              {isWishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
            <div className="relative">
              <button onClick={() => setShowShareMenu(!showShareMenu)} className="btn-secondary !text-[13px]">
                📤 Share
              </button>
              {showShareMenu && (
                <div className="absolute top-full mt-2 right-0 panel-elevated p-2 min-w-[160px] animate-fade-in z-20">
                  <button onClick={() => shareItem('twitter')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5">𝕏 Twitter</button>
                  <button onClick={() => shareItem('facebook')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5">f Facebook</button>
                  <button onClick={() => shareItem('linkedin')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5">in LinkedIn</button>
                  <button onClick={() => shareItem('copy')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5">🔗 Copy Link</button>
                </div>
              )}
            </div>
            <button onClick={reportItem} className="btn-secondary !text-[13px]">
              🚩 Report
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {(['details', 'seller', 'similar'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-md text-[13px] font-medium transition-all capitalize ${
                  activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                style={activeTab === tab ? { background: 'rgba(255,255,255,0.08)' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-[14px] text-zinc-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="panel p-4">
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Category</p>
                  <p className="text-[14px] text-white font-medium">{item.category}</p>
                </div>
                <div className="panel p-4">
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Condition</p>
                  <p className="text-[14px] text-white font-medium">{item.condition || 'Good'}</p>
                </div>
                <div className="panel p-4">
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-[14px] text-white font-medium">📍 {item.location}</p>
                </div>
                {type === 'pair' && (
                  <div className="panel p-4">
                    <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Price</p>
                    <p className="text-[14px] text-cyan-400 font-bold">${item.price} <span className="text-[12px] text-zinc-600 line-through">${item.originalPrice}</span></p>
                  </div>
                )}
              </div>

              {item.matchScore && (
                <div className="panel p-4">
                  <div className="flex justify-between text-[12px] mb-2">
                    <span className="text-zinc-500">Match Confidence</span>
                    <span className="text-cyan-400 font-semibold">{item.matchScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="match-bar h-full" style={{ width: `${item.matchScore}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="space-y-4 animate-fade-in">
              <div className="panel p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-black" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
                    {item.seller?.[0] || 'U'}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-white">{item.seller}</h4>
                    <p className="text-[12px] text-zinc-500">Member since 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-[18px] font-bold gradient-text">{item.trustScore || 95}</p>
                    <p className="text-[10px] text-zinc-500">Trust Score</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-[18px] font-bold gradient-text">4.9</p>
                    <p className="text-[10px] text-zinc-500">Rating</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-[18px] font-bold gradient-text">23</p>
                    <p className="text-[10px] text-zinc-500">Items</p>
                  </div>
                </div>

                <button className="btn-primary w-full !text-[13px]">
                  💬 Message Seller
                </button>
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-[13px] text-zinc-500 mb-4">You might also be interested in:</p>
              {[1, 2, 3].map((i) => (
                <div key={i} className="panel p-4 flex items-center gap-4 card-hover cursor-pointer">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'rgba(6,182,212,0.1)' }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white mb-1">Similar Item {i}</h4>
                    <p className="text-[12px] text-zinc-500">92% match • {item.location}</p>
                  </div>
                  <button className="text-[12px] text-cyan-400 font-medium">View →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
