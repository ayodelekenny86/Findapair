// ============================================
// Admin Dashboard Component
// User management, content moderation, analytics
// ============================================

import { useState, useEffect } from 'react'
import { authService } from '../lib/auth'
import { enhancedDb } from '../lib/enhancedDb'

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'items' | 'reports' | 'settings'>('overview')
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    if (isOpen && authService.isAdmin()) {
      loadData()
    }
  }, [isOpen, activeTab])

  const loadData = () => {
    setStats(enhancedDb.getAdminStats())
    setUsers(enhancedDb.getAllUsers())
    setItems(enhancedDb.getAllItems())
    setReports(enhancedDb.getReports())
    setSettings(enhancedDb.getSiteSettings())
  }

  if (!isOpen) return null

  if (!authService.isAdmin()) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
            <p className="text-sm text-zinc-400 mb-4">You need admin privileges to access this panel.</p>
            <button onClick={onClose} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 overflow-auto" onClick={onClose}>
      <div className="max-w-7xl mx-auto p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">👑 Admin Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage users, content, and site settings</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">
            ← Back to Site
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-800">
          {(['overview', 'users', 'items', 'reports', 'settings'] as const).map((tab) => (
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
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-cyan-400">{stats.totalUsers}</div>
                <div className="text-sm text-zinc-400 mt-1">Total Users</div>
                <div className="text-xs text-zinc-500 mt-2">{stats.activeUsers} active, {stats.bannedUsers} banned</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-emerald-400">{stats.totalItems}</div>
                <div className="text-sm text-zinc-400 mt-1">Total Items</div>
                <div className="text-xs text-zinc-500 mt-2">{stats.activeItems} active, {stats.matchedItems} matched</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-amber-400">{stats.pendingReports}</div>
                <div className="text-sm text-zinc-400 mt-1">Pending Reports</div>
                <div className="text-xs text-zinc-500 mt-2">{stats.resolvedReports} resolved</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-xs font-bold text-black">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-zinc-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded capitalize" style={{
                        background: `${authService.getRole() === user.role ? '#06b6d4' : '#71717a'}20`,
                        color: authService.getRole() === user.role ? '#06b6d4' : '#71717a'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded capitalize ${
                        user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                        user.status === 'banned' ? 'bg-red-500/10 text-red-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700">
                          Edit
                        </button>
                        {user.status === 'active' ? (
                          <button className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                            Ban
                          </button>
                        ) : (
                          <button className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20">
                            Unban
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All Items ({items.length})</h3>
            <div className="space-y-2">
              {items.slice(0, 20).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="text-xs text-zinc-500">{item.category} • {item.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded hover:bg-cyan-500/20">
                      Feature
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reports ({reports.length})</h3>
            {reports.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-8">No reports yet</p>
            ) : (
              <div className="space-y-2">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 bg-zinc-800/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-white">{report.reason}</div>
                        <div className="text-xs text-zinc-500 mt-1">{report.description}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded capitalize ${
                        report.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        report.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-zinc-500/10 text-zinc-400'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20">
                        Resolve
                      </button>
                      <button className="px-3 py-1 text-xs bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && settings && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Site Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white">Maintenance Mode</div>
                  <div className="text-xs text-zinc-500">Disable site for maintenance</div>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => {
                    setSettings({ ...settings, maintenanceMode: e.target.checked })
                  }} className="sr-only peer" />
                  <div className="w-12 h-6 bg-zinc-700 rounded-full peer-checked:bg-cyan-500 transition-colors"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white">Registration Enabled</div>
                  <div className="text-xs text-zinc-500">Allow new user registrations</div>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" checked={settings.registrationEnabled} onChange={(e) => {
                    setSettings({ ...settings, registrationEnabled: e.target.checked })
                  }} className="sr-only peer" />
                  <div className="w-12 h-6 bg-zinc-700 rounded-full peer-checked:bg-cyan-500 transition-colors"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <button className="w-full px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
