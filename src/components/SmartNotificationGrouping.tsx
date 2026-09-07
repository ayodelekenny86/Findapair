import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  timestamp: number
  read: boolean
}

interface NotificationGroup {
  type: string
  count: number
  latest: Notification
  notifications: Notification[]
}

export default function SmartNotificationGrouping() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [groups, setGroups] = useState<NotificationGroup[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('findapair_currentUser') || '{}')
    setNotifications(user.notifications || [])
  }, [])

  useEffect(() => {
    groupNotifications()
  }, [notifications])

  const groupNotifications = () => {
    const grouped: { [key: string]: Notification[] } = {}

    notifications.forEach((notif) => {
      if (!grouped[notif.type]) {
        grouped[notif.type] = []
      }
      grouped[notif.type].push(notif)
    })

    const groupsArray: NotificationGroup[] = Object.entries(grouped).map(([type, notifs]) => ({
      type,
      count: notifs.length,
      latest: notifs[0],
      notifications: notifs,
    }))

    setGroups(groupsArray.sort((a, b) => b.latest.timestamp - a.latest.timestamp))
  }

  const getGroupIcon = (type: string) => {
    switch (type) {
      case 'match': return '💕'
      case 'message': return '💬'
      case 'system': return '🔔'
      case 'achievement': return '🏆'
      default: return '📩'
    }
  }

  const getGroupColor = (type: string) => {
    switch (type) {
      case 'match': return 'border-pink-500/30 bg-pink-500/5'
      case 'message': return 'border-blue-500/30 bg-blue-500/5'
      case 'system': return 'border-amber-500/30 bg-amber-500/5'
      case 'achievement': return 'border-emerald-500/30 bg-emerald-500/5'
      default: return 'border-zinc-700 bg-zinc-800/30'
    }
  }

  if (groups.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">🔔 Smart Notifications</h3>
      
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group.type}
            className={`border rounded-lg p-3 ${getGroupColor(group.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getGroupIcon(group.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white capitalize">{group.type}</span>
                  <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded">
                    {group.count} {group.count === 1 ? 'notification' : 'notifications'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-1">{group.latest.title}</p>
                <p className="text-[10px] text-zinc-600">
                  Latest: {new Date(group.latest.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
