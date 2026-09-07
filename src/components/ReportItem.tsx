import { useState } from 'react'
import type { Item } from '../lib/db'

interface ReportItemProps {
  item: Item
  onClose: () => void
  onSubmit: (reason: string) => void
}

export default function ReportItem({ item, onClose, onSubmit }: ReportItemProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [details, setDetails] = useState('')

  const reasons = [
    { id: 'spam', label: 'Spam or misleading', icon: '🚫' },
    { id: 'inappropriate', label: 'Inappropriate content', icon: '⚠️' },
    { id: 'fraud', label: 'Suspected fraud', icon: '🎭' },
    { id: 'duplicate', label: 'Duplicate listing', icon: '📋' },
    { id: 'sold', label: 'Already sold', icon: '✅' },
    { id: 'other', label: 'Other', icon: '📝' },
  ]

  const handleSubmit = () => {
    if (!selectedReason) return
    onSubmit(`${selectedReason}${details ? `: ${details}` : ''}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">🚩 Report Item</h3>
          <p className="text-xs text-zinc-500 mt-1">Help us keep the community safe</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="text-xs text-zinc-500">by {item.seller}</div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-2 block">Reason for reporting</label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    selectedReason === reason.id
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : 'bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  <span className="text-lg">{reason.icon}</span>
                  <span className="text-sm">{reason.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedReason && (
            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-2 block">Additional details (optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide more context..."
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
