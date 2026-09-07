import { useState } from 'react'
import type { Item } from '../lib/db'

interface BulkActionsProps {
  items: Item[]
  selectedItems: string[]
  onClearSelection: () => void
  onBulkAction: (action: string, itemIds: string[]) => void
}

export default function BulkActions({ items, selectedItems, onClearSelection, onBulkAction }: BulkActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingAction, setPendingAction] = useState('')

  if (selectedItems.length === 0) return null

  const actions = [
    { id: 'delete', label: 'Delete', icon: '🗑️', color: 'red' },
    { id: 'archive', label: 'Archive', icon: '📦', color: 'amber' },
    { id: 'duplicate', label: 'Duplicate', icon: '📋', color: 'cyan' },
    { id: 'export', label: 'Export', icon: '📤', color: 'emerald' },
  ]

  const handleAction = (actionId: string) => {
    if (actionId === 'delete') {
      setPendingAction(actionId)
      setShowConfirm(true)
    } else {
      onBulkAction(actionId, selectedItems)
      onClearSelection()
    }
  }

  const confirmAction = () => {
    onBulkAction(pendingAction, selectedItems)
    onClearSelection()
    setShowConfirm(false)
  }

  return (
    <>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-4 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="text-sm text-zinc-400">
            <span className="font-bold text-cyan-400">{selectedItems.length}</span> items selected
          </div>
          
          <div className="flex gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  action.color === 'red' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' :
                  action.color === 'amber' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' :
                  action.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' :
                  'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>

          <button
            onClick={onClearSelection}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          >
            Clear
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete {selectedItems.length} items? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
