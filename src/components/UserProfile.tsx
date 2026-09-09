import { useState } from 'react'
import { db } from '../lib/db'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(() => {
    const user = db.getCurrentUser()
    return {
      name: user.name,
      email: user.email,
      bio: '',
      location: '',
      website: '',
    }
  })

  if (!isOpen) return null

  const user = db.getCurrentUser()
  const userItems = db.getItems().filter(i => i.sellerId === user.id)
  const matchedItems = userItems.filter(i => i.status === 'matched').length
  const totalViews = userItems.reduce((sum, i) => sum + i.views, 0)

  const handleSave = () => {
    db.updateCurrentUser({
      name: profile.name,
      email: profile.email,
    })
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-lg font-semibold text-white">Profile</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-2xl font-bold text-black">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
                    placeholder="Email"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white resize-none"
                    placeholder="Bio"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg">
                      Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="text-xl font-bold text-white">{user.name}</h4>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                  <p className="text-xs text-zinc-500 mt-1">Member since {user.joinDate}</p>
                  <button onClick={() => setIsEditing(true)} className="mt-2 text-xs text-cyan-400 hover:text-cyan-300">
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-cyan-400">{userItems.length}</div>
              <div className="text-xs text-zinc-500">Posted</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">{matchedItems}</div>
              <div className="text-xs text-zinc-500">Matched</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-amber-400">{totalViews}</div>
              <div className="text-xs text-zinc-500">Views</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-purple-400">{user.trustScore}</div>
              <div className="text-xs text-zinc-500">Trust</div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-zinc-400 mb-3">Badges</h5>
            <div className="flex flex-wrap gap-2">
              {user.trustScore >= 90 && (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs">
                  ✓ Verified
                </span>
              )}
              {userItems.length >= 10 && (
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs">
                  🏆 Top Seller
                </span>
              )}
              {matchedItems >= 5 && (
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs">
                  ⭐ Match Master
                </span>
              )}
              {user.wishlist.length >= 10 && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs">
                  ❤️ Collector
                </span>
              )}
            </div>
          </div>

          {/* Recent Items */}
          {userItems.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-zinc-400 mb-3">Your Recent Items</h5>
              <div className="space-y-2">
                {userItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-zinc-800/30 rounded-lg">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm text-white">{item.title}</div>
                      <div className="text-xs text-zinc-500">{item.postedAgo}</div>
                    </div>
                    <div className="text-right">
                      {item.type === 'pair' ? (
                        <div className="text-sm text-cyan-400">${item.price}</div>
                      ) : (
                        <div className="text-sm text-emerald-400">FREE</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
