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
  { id: 1, type: 'match', title: 'New Match Found!', message: 'Someone has the right gold hoop earring.', time: '2m ago', read: false, emoji: '💎' },
  { id: 2, type: 'claim', title: 'Item Claimed', message: 'Your free bookshelf has been claimed.', time: '1h ago', read: false, emoji: '🎁' },
  { id: 3, type: 'message', title: 'New Message', message: 'Mike R. sent you a message.', time: '3h ago', read: true, emoji: '💬' },
  { id: 4, type: 'system', title: 'Trust Score Updated', message: 'Your trust score increased to 95!', time: '1d ago', read: true, emoji: '⭐' },
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ background: '#06b6d4' }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 w-72 panel-elevated overflow-hidden animate-slide-down z-50">
          <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 className="text-[13px] font-semibold text-white">Notifications</h4>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-[11px] text-cyan-400 hover:text-cyan-300">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
              >
                <span className="text-lg flex-shrink-0">{notif.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-[12px] font-medium truncate ${!notif.read ? 'text-white' : 'text-zinc-400'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#06b6d4' }}></span>}
                  </div>
                  <p className="text-[11px] text-zinc-600 truncate mt-0.5">{notif.message}</p>
                  <p className="text-[10px] text-zinc-700 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium">
              View all →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
