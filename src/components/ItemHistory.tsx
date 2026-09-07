import type { Item } from '../lib/db'

interface ItemHistoryProps {
  item: Item
}

interface HistoryEvent {
  id: string
  type: 'created' | 'viewed' | 'saved' | 'matched' | 'updated' | 'status_changed'
  message: string
  timestamp: number
  icon: string
}

export default function ItemHistory({ item }: ItemHistoryProps) {
  // Simulate history based on item data
  const history: HistoryEvent[] = [
    {
      id: '1',
      type: 'created',
      message: 'Item posted',
      timestamp: item.postedAt,
      icon: '📝',
    },
    {
      id: '2',
      type: 'viewed',
      message: `${item.views} views`,
      timestamp: Date.now() - 86400000, // 1 day ago
      icon: '👁️',
    },
    {
      id: '3',
      type: 'saved',
      message: `${item.saves} saves`,
      timestamp: Date.now() - 43200000, // 12 hours ago
      icon: '❤️',
    },
  ]

  if (item.status === 'matched') {
    history.push({
      id: '4',
      type: 'matched',
      message: 'Item matched!',
      timestamp: Date.now(),
      icon: '✅',
    })
  }

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">📅 Item History</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800"></div>

        <div className="space-y-4">
          {history.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-sm">
                  {event.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-white">{event.message}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(event.timestamp).toLocaleDateString()} at{' '}
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-600 whitespace-nowrap">{formatTime(event.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
