import { useState, useEffect } from 'react'
import { db } from '../lib/db'

interface NotificationsCenterProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsCenter({ isOpen, onClose }: NotificationsCenterProps) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }
  }, [isOpen])

  const loadNotifications = () => {
    const user = db.getCurrentUser()
    setNotifications(user.notifications || [])
  }

  const markAsRead = (id: string) => {
    const user = db.getCurrentUser()
    const updated = user.notifications.map((n: any) =>
      n.id === id ? { ...n, read: true } : n
    )
    db.updateCurrentUser({ notifications: updated })
    setNotifications(updated)
  }

  const markAllAsRead = () => {
    const user = db.getCurrentUser()
    const updated = user.notifications.map((n: any) => ({ ...n, read: true }))
    db.updateCurrentUser({ notifications: updated })
    setNotifications(updated)
  }

  const deleteNotification = (id: string) => {
    const user = db.getCurrentUser()
    const updated = user.notifications.filter((n: any) => n.id !== id)
    db.updateCurrentUser({ notifications: updated })
    setNotifications(updated)
  }

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const unreadCount = notifications.filter(n => !n.read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <p className="text-xs text-zinc-500">{unreadCount} unread</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-cyan-400 hover:text-cyan-300">
                Mark all read
              </button>
            )}
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
              ✕
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 border-b border-zinc-800 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">🔔</div>
              <p className="text-sm text-zinc-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-zinc-800/30 transition-colors ${
                    !notification.read ? 'bg-cyan-500/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{notification.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{notification.message}</p>
                          <p className="text-[10px] text-zinc-600 mt-1">{notification.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-[10px] text-cyan-400 hover:text-cyan-300"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-[10px] text-zinc-500 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
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
