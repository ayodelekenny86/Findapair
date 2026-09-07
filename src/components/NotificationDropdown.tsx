import { useState, useEffect, useRef } from 'react'

interface Notification {
  id: number
  type: 'match' | 'claim' | 'message' | 'system'
  title: string
  message: string
  time: string
  read: boolean
  emoji: string
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'match', title: 'New Match Found!', message: 'Someone has the right gold hoop earring that matches yours.', time: '2 min ago', read: false, emoji: '💎' },
  { id: 2, type: 'claim', title: 'Item Claimed', message: 'Your free bookshelf has been claimed by Emma S.', time: '1 hour ago', read: false, emoji: '🎁' },
  { id: 3, type: 'message', title: 'New Message', message: 'Mike R. sent you a message about the Nike Air Max.', time: '3 hours ago', read: true, emoji: '💬' },
  { id: 4, type: 'system', title: 'Trust Score Updated', message: 'Your trust score increased to 95! Great job.', time: '1 day ago', read: true, emoji: '⭐' },
  { id: 5, type: 'match', title: 'Potential Match', message: '87% match: Left cashmere glove found in Chicago.', time: '2 days ago', read: true, emoji: '🧤' },
]

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'bg-cyan-500/10 border-cyan-500/20'
      case 'claim': return 'bg-green-500/10 border-green-500/20'
      case 'message': return 'bg-purple-500/10 border-purple-500/20'
      case 'system': return 'bg-amber-500/10 border-amber-500/20'
      default: return 'bg-slate-800 border-slate-700'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 glass-light rounded-lg flex items-center justify-center hover:border-cyan-500/30 transition-all"
      >
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center notification-badge">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 glass rounded-xl overflow-hidden shadow-2xl animate-slide-down border border-cyan-500/20 z-50">
          {/* Header */}
          <div className="p-3 border-b border-cyan-500/10 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-100">Notifications</h4>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-cyan-400 hover:text-cyan-300">
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`w-full text-left p-3 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                  !notif.read ? 'bg-slate-800/20' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${getTypeColor(notif.type)}`}>
                    {notif.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-semibold truncate ${!notif.read ? 'text-slate-100' : 'text-slate-400'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{notif.message}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{notif.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-cyan-500/10">
            <button className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 font-medium">
              View all notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
