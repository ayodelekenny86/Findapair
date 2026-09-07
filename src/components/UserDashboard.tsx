import { useState, useEffect } from 'react'

interface UserDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserDashboard({ isOpen, onClose }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'wishlist' | 'settings'>('overview')
  const [wishlist, setWishlist] = useState<number[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlist(saved)
  }, [])

  const userStats = {
    itemsPosted: 5,
    itemsMatched: 3,
    itemsGiven: 8,
    trustScore: 95,
    rank: 127,
    totalRank: 12847,
    joinDate: '2024-03-15',
    ecoImpact: {
      wastePrevented: 2.4,
      co2Saved: 6.0,
      treesEquivalent: 272,
    }
  }

  const achievements = [
    { icon: '🎯', title: 'First Match', description: 'Found your first pair', earned: true },
    { icon: '🌟', title: 'Trusted Member', description: 'Trust score above 90', earned: true },
    { icon: '♻️', title: 'Eco Warrior', description: 'Prevented 1kg of waste', earned: true },
    { icon: '🏆', title: 'Top Contributor', description: 'Top 100 members', earned: false },
    { icon: '💎', title: 'Power User', description: 'Posted 10 items', earned: false },
    { icon: '🌍', title: 'Global Impact', description: 'Prevented 10kg of waste', earned: false },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="panel-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 flex items-center justify-between" style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-black" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
              JD
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-white">John Doe</h3>
              <p className="text-[12px] text-zinc-500">Member since March 2024 • Rank #{userStats.rank}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">✕</button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {(['overview', 'listings', 'wishlist', 'settings'] as const).map((tab) => (
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

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="panel p-4 text-center">
                  <p className="text-[24px] font-bold gradient-text">{userStats.itemsPosted}</p>
                  <p className="text-[11px] text-zinc-500">Items Posted</p>
                </div>
                <div className="panel p-4 text-center">
                  <p className="text-[24px] font-bold gradient-text">{userStats.itemsMatched}</p>
                  <p className="text-[11px] text-zinc-500">Pairs Matched</p>
                </div>
                <div className="panel p-4 text-center">
                  <p className="text-[24px] font-bold gradient-text">{userStats.itemsGiven}</p>
                  <p className="text-[11px] text-zinc-500">Items Given</p>
                </div>
                <div className="panel p-4 text-center">
                  <p className="text-[24px] font-bold gradient-text">{userStats.trustScore}</p>
                  <p className="text-[11px] text-zinc-500">Trust Score</p>
                </div>
              </div>

              {/* Eco Impact */}
              <div className="panel p-6">
                <h4 className="text-[14px] font-semibold text-white mb-4">🌍 Your Environmental Impact</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-[20px] font-bold text-emerald-400">{userStats.ecoImpact.wastePrevented}kg</p>
                    <p className="text-[11px] text-zinc-500">Waste Prevented</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold text-emerald-400">{userStats.ecoImpact.co2Saved}kg</p>
                    <p className="text-[11px] text-zinc-500">CO₂ Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold text-emerald-400">{userStats.ecoImpact.treesEquivalent}</p>
                    <p className="text-[11px] text-zinc-500">Trees Equivalent</p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="panel p-6">
                <h4 className="text-[14px] font-semibold text-white mb-4">🏆 Achievements</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {achievements.map((achievement, i) => (
                    <div key={i} className={`p-3 rounded-lg text-center ${achievement.earned ? '' : 'opacity-40'}`} style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <span className="text-2xl mb-1 block">{achievement.icon}</span>
                      <p className="text-[12px] font-semibold text-white">{achievement.title}</p>
                      <p className="text-[10px] text-zinc-500">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[14px] font-semibold text-white">Your Active Listings</h4>
                <span className="text-[12px] text-zinc-500">{userStats.itemsPosted} items</span>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="panel p-4 flex items-center gap-4 card-hover">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(6,182,212,0.1)' }}>
                    💎
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white mb-1">Gold Earring #{i}</h4>
                    <p className="text-[12px] text-zinc-500">Posted 2 days ago • 94% match</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[12px] text-cyan-400 font-medium">Edit</button>
                    <button className="text-[12px] text-red-400 font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[14px] font-semibold text-white">Your Wishlist</h4>
                <span className="text-[12px] text-zinc-500">{wishlist.length} items</span>
              </div>
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl mb-3 block">🤍</span>
                  <p className="text-[14px] text-zinc-500">Your wishlist is empty</p>
                  <p className="text-[12px] text-zinc-600 mt-1">Save items you're interested in</p>
                </div>
              ) : (
                wishlist.map((id) => (
                  <div key={id} className="panel p-4 flex items-center gap-4 card-hover">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(6,182,212,0.1)' }}>
                      💎
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-semibold text-white mb-1">Saved Item #{id}</h4>
                      <p className="text-[12px] text-zinc-500">Added to wishlist</p>
                    </div>
                    <button
                      onClick={() => {
                        const newWishlist = wishlist.filter(i => i !== id)
                        setWishlist(newWishlist)
                        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
                      }}
                      className="text-[12px] text-red-400 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-fade-in">
              <div className="panel p-6">
                <h4 className="text-[14px] font-semibold text-white mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  {[
                    { label: 'New matches', description: 'Get notified when a match is found' },
                    { label: 'Item claimed', description: 'When someone claims your free item' },
                    { label: 'Messages', description: 'New messages from other members' },
                    { label: 'Weekly digest', description: 'Summary of your activity' },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-[13px] text-white">{setting.label}</p>
                        <p className="text-[11px] text-zinc-500">{setting.description}</p>
                      </div>
                      <label className="relative inline-block w-10 h-6">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-6 rounded-full peer-checked:bg-cyan-500 cursor-pointer transition-colors" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <h4 className="text-[14px] font-semibold text-white mb-4">Account</h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                    Edit Profile
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                    Change Password
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                    Export Data
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-[13px] text-red-400 hover:bg-red-500/5 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
