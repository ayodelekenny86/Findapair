import { useState, useEffect } from 'react'
import { realTimeService } from '../lib/realtime'

interface LiveEvent {
  id: string
  type: string
  message: string
  timestamp: number
  data?: any
}

export default function LiveNotifications() {
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // Subscribe to real-time events
    const handleNewItem = (event: any) => {
      addEvent({
        type: 'new_item',
        message: `New item posted: ${event.data.title}`,
        data: event.data,
      })
    }

    const handleMatchFound = (event: any) => {
      addEvent({
        type: 'match_found',
        message: `Potential match found! (${event.data.matchScore}% confidence)`,
        data: event.data,
      })
    }

    const handleUserOnline = (event: any) => {
      addEvent({
        type: 'user_online',
        message: `${event.data.username} is now online`,
        data: event.data,
      })
    }

    realTimeService.on('new_item', handleNewItem)
    realTimeService.on('match_found', handleMatchFound)
    realTimeService.on('user_online', handleUserOnline)

    return () => {
      realTimeService.off('new_item', handleNewItem)
      realTimeService.off('match_found', handleMatchFound)
      realTimeService.off('user_online', handleUserOnline)
    }
  }, [])

  const addEvent = (event: Omit<LiveEvent, 'id' | 'timestamp'>) => {
    const newEvent: LiveEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }

    setEvents(prev => [newEvent, ...prev].slice(0, 20)) // Keep last 20 events
  }

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'new_item': return '📦'
      case 'match_found': return '🎯'
      case 'user_online': return '🟢'
      default: return '🔔'
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'new_item': return 'border-blue-500/30 bg-blue-500/5'
      case 'match_found': return 'border-cyan-500/30 bg-cyan-500/5'
      case 'user_online': return 'border-green-500/30 bg-green-500/5'
      default: return 'border-zinc-700/30 bg-zinc-800/30'
    }
  }

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Live Activity</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-zinc-400">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          <div className="text-4xl mb-2">📡</div>
          <div className="text-sm">Waiting for live updates...</div>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.map((event, idx) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border ${getEventColor(event.type)} ${
                idx === 0 ? 'animate-slide-in' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                <div className="flex-1">
                  <div className="text-sm text-white">{event.message}</div>
                  <div className="text-xs text-zinc-500 mt-1">{formatTime(event.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{events.length} events received</span>
          <button
            onClick={() => setEvents([])}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
