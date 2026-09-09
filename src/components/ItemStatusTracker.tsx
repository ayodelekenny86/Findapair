import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface StatusChange {
  id: string
  fromStatus: string
  toStatus: string
  timestamp: number
  note?: string
}

interface ItemStatusTrackerProps {
  item: Item
}

export default function ItemStatusTracker({ item }: ItemStatusTrackerProps) {
  const [statusHistory, setStatusHistory] = useState<StatusChange[]>([])
  const [currentStatus, setCurrentStatus] = useState<string>(item.status)
  const [showChangeForm, setShowChangeForm] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    loadStatusHistory()
  }, [item.id])

  const loadStatusHistory = () => {
    const stored = localStorage.getItem(`status_${item.id}`)
    if (stored) {
      setStatusHistory(JSON.parse(stored))
    } else {
      // Initialize with creation event
      const initial: StatusChange = {
        id: '1',
        fromStatus: 'none',
        toStatus: 'active',
        timestamp: item.postedAt,
        note: 'Item created',
      }
      setStatusHistory([initial])
      localStorage.setItem(`status_${item.id}`, JSON.stringify([initial]))
    }
  }

  const saveStatusHistory = (updated: StatusChange[]) => {
    setStatusHistory(updated)
    localStorage.setItem(`status_${item.id}`, JSON.stringify(updated))
  }

  const changeStatus = () => {
    if (!newStatus) return

    const change: StatusChange = {
      id: Date.now().toString(),
      fromStatus: currentStatus,
      toStatus: newStatus,
      timestamp: Date.now(),
      note: note || undefined,
    }

    saveStatusHistory([change, ...statusHistory])
    setCurrentStatus(newStatus)
    setNewStatus('')
    setNote('')
    setShowChangeForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'matched': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
      case 'sold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'archived': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
    }
  }

  const statuses = ['active', 'matched', 'sold', 'archived']

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-400">📊 Status Tracker</h3>
        <button
          onClick={() => setShowChangeForm(!showChangeForm)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          Change Status
        </button>
      </div>

      {/* Current Status */}
      <div className="mb-4">
        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(currentStatus)}`}>
          {currentStatus.toUpperCase()}
        </span>
      </div>

      {/* Change Status Form */}
      {showChangeForm && (
        <div className="mb-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
          <div className="space-y-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">Select new status...</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)..."
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex gap-2">
              <button
                onClick={changeStatus}
                disabled={!newStatus}
                className="flex-1 px-4 py-2 bg-cyan-500 text-black text-xs font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50"
              >
                Update Status
              </button>
              <button
                onClick={() => setShowChangeForm(false)}
                className="px-4 py-2 bg-zinc-700 text-zinc-300 text-xs rounded-lg hover:bg-zinc-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status History */}
      <div className="space-y-2">
        {statusHistory.map((change, index) => (
          <div key={change.id} className="flex items-start gap-3 p-3 bg-zinc-800/30 border border-zinc-800 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-xs">
              {index === 0 ? '🔄' : '📝'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(change.fromStatus)}`}>
                  {change.fromStatus}
                </span>
                <span className="text-zinc-600">→</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(change.toStatus)}`}>
                  {change.toStatus}
                </span>
              </div>
              {change.note && (
                <p className="text-xs text-zinc-400 mb-1">{change.note}</p>
              )}
              <p className="text-[10px] text-zinc-600">
                {new Date(change.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
