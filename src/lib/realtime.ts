// Real-time WebSocket simulation for live updates
import { db } from './db'

type EventType = 'new_item' | 'match_found' | 'message' | 'user_online' | 'price_update'

interface RealTimeEvent {
  type: EventType
  data: any
  timestamp: number
}

type EventHandler = (event: RealTimeEvent) => void

class RealTimeService {
  private handlers: Map<EventType, Set<EventHandler>> = new Map()
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor() {
    this.connect()
  }

  private connect() {
    // Simulate WebSocket connection
    this.isConnected = true
    console.log('[RealTime] Connected to live updates')
    
    // Start emitting events
    this.startEventSimulation()
  }

  private startEventSimulation() {
    // Simulate real-time events
    setInterval(() => {
      if (!this.isConnected) return

      const events: EventType[] = ['new_item', 'match_found', 'user_online']
      const randomEvent = events[Math.floor(Math.random() * events.length)]

      switch (randomEvent) {
        case 'new_item':
          this.emit({
            type: 'new_item',
            data: {
              id: `item_${Date.now()}`,
              title: 'New item posted',
              emoji: ['💎', '👟', '🧤', '⌚'][Math.floor(Math.random() * 4)],
            },
            timestamp: Date.now(),
          })
          break

        case 'match_found':
          this.emit({
            type: 'match_found',
            data: {
              matchScore: Math.floor(Math.random() * 20) + 80,
              itemId: `item_${Math.floor(Math.random() * 1000)}`,
            },
            timestamp: Date.now(),
          })
          break

        case 'user_online':
          this.emit({
            type: 'user_online',
            data: {
              userId: `user_${Math.floor(Math.random() * 1000)}`,
              username: `User${Math.floor(Math.random() * 1000)}`,
            },
            timestamp: Date.now(),
          })
          break
      }
    }, 5000)
  }

  on(eventType: EventType, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set())
    }
    this.handlers.get(eventType)!.add(handler)
  }

  off(eventType: EventType, handler: EventHandler) {
    this.handlers.get(eventType)?.delete(handler)
  }

  private emit(event: RealTimeEvent) {
    this.handlers.get(event.type)?.forEach(handler => handler(event))
  }

  disconnect() {
    this.isConnected = false
    this.handlers.clear()
  }
}

export const realTimeService = new RealTimeService()
