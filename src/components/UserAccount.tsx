// ============================================
// User Account Component
// Profile management, settings, security
// ============================================

import { useState, useEffect } from 'react'
import { db } from '../lib/db'
import { authService } from '../lib/auth'

interface UserAccountProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserAccount({ isOpen, onClose }: UserAccountProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings' | 'activity'>('profile')
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    if (isOpen) {
      setUser(db.getCurrentUser())
      setEditData(db.getCurrentUser())
    }
  }, [isOpen])

  const handleSave = () => {
    db.updateCurrentUser(editData)
    setUser(editData)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditData(user)
    setEditing(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 overflow-auto" onClick={onClose}>
      <div className="max-w-4xl mx-auto p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">👤 My Account</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage your profile and settings</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">
            ← Back to Site
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-800">
          {(['profile', 'security', 'settings', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {user && activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-3xl font-bold text-black">
                    {user.name[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                    <p className="text-sm text-zinc-400">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded capitalize" style={{
                        background: `${authService.getRole() === 'admin' ? '#ef4444' : '#06b6d4'}20`,
                        color: authService.getRole() === 'admin' ? '#ef4444' : '#06b6d4'
                      }}>
                        {authService.getRole()}
                      </span>
                      <span className="text-xs text-zinc-500">Trust Score: {user.trustScore}</span>
                    </div>
                  </div>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyan-400">{user.itemsPosted}</div>
                    <div className="text-sm text-zinc-400 mt-1">Items Posted</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-400">{user.itemsMatched}</div>
                    <div className="text-sm text-zinc-400 mt-1">Items Matched</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-amber-400">{user.itemsGiven}</div>
                    <div className="text-sm text-zinc-400 mt-1">Items Given</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">{user.points}</div>
                    <div className="text-sm text-zinc-400 mt-1">Points</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Change Password</div>
                    <div className="text-xs text-zinc-500">Last changed: Never</div>
                  </div>
                  <button className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700">
                    Change
                  </button>
                </div>
              </div>
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                    <div className="text-xs text-zinc-500">Add an extra layer of security</div>
                  </div>
                  <button className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400">
                    Enable
                  </button>
                </div>
              </div>
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Active Sessions</div>
                    <div className="text-xs text-zinc-500">1 active session</div>
                  </div>
                  <button className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && user && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
            <div className="space-y-4">
              {Object.entries(user.settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {key.includes('Email') ? 'Receive email notifications' :
                       key.includes('Push') ? 'Receive push notifications' :
                       key.includes('Match') ? 'Get notified about matches' :
                       'Weekly digest email'}
                    </div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={value as boolean}
                      onChange={(e) => {
                        const updated = {
                          ...user,
                          settings: {
                            ...user.settings,
                            [key]: e.target.checked
                          }
                        }
                        setUser(updated)
                        db.updateCurrentUser(updated)
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-zinc-700 rounded-full peer-checked:bg-cyan-500 transition-colors"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📝</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Posted "Left Gold Hoop Earring"</div>
                    <div className="text-xs text-zinc-500 mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💕</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Matched with Sarah K.</div>
                    <div className="text-xs text-zinc-500 mt-1">1 day ago</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎁</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Gave away "Winter Coat"</div>
                    <div className="text-xs text-zinc-500 mt-1">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
