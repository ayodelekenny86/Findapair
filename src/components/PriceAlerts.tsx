import { useState, useEffect } from 'react'

interface PriceAlert {
  id: string
  itemId: string
  itemTitle: string
  targetPrice: number
  currentPrice: number
  createdAt: number
  triggered: boolean
}

interface PriceAlertsProps {
  isOpen: boolean
  onClose: () => void
}

export default function PriceAlerts({ isOpen, onClose }: PriceAlertsProps) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newItemId, setNewItemId] = useState('')
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newTargetPrice, setNewTargetPrice] = useState(0)

  useEffect(() => {
    if (isOpen) {
      loadAlerts()
    }
  }, [isOpen])

  const loadAlerts = () => {
    const stored = localStorage.getItem('priceAlerts')
    if (stored) {
      setAlerts(JSON.parse(stored))
    }
  }

  const saveAlerts = (updated: PriceAlert[]) => {
    setAlerts(updated)
    localStorage.setItem('priceAlerts', JSON.stringify(updated))
  }

  const createAlert = () => {
    if (!newItemId || !newItemTitle || newTargetPrice <= 0) return

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      itemId: newItemId,
      itemTitle: newItemTitle,
      targetPrice: newTargetPrice,
      currentPrice: newTargetPrice + 10, // Simulated
      createdAt: Date.now(),
      triggered: false,
    }

    saveAlerts([newAlert, ...alerts])
    setNewItemId('')
    setNewItemTitle('')
    setNewTargetPrice(0)
    setShowCreateForm(false)
  }

  const deleteAlert = (id: string) => {
    saveAlerts(alerts.filter(a => a.id !== id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">🔔 Price Alerts</h3>
            <p className="text-xs text-zinc-500">Get notified when prices drop</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              + New Alert
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
              ✕
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="p-6 border-b border-zinc-800 bg-zinc-800/30">
            <div className="space-y-3">
              <input
                type="text"
                value={newItemId}
                onChange={(e) => setNewItemId(e.target.value)}
                placeholder="Item ID..."
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Item title..."
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                value={newTargetPrice}
                onChange={(e) => setNewTargetPrice(Number(e.target.value))}
                placeholder="Target price ($)"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={createAlert}
                className="w-full px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
              >
                Create Alert
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔔</div>
              <p className="text-sm text-zinc-500">No price alerts</p>
              <p className="text-xs text-zinc-600 mt-1">Create an alert to get notified</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{alert.itemTitle}</h4>
                      <p className="text-xs text-zinc-500 mt-1">Item ID: {alert.itemId}</p>
                    </div>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="text-xs text-zinc-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <div className="text-xs text-zinc-500">Current</div>
                      <div className="text-sm font-bold text-white">${alert.currentPrice}</div>
                    </div>
                    <div className="text-zinc-600">→</div>
                    <div>
                      <div className="text-xs text-zinc-500">Target</div>
                      <div className="text-sm font-bold text-cyan-400">${alert.targetPrice}</div>
                    </div>
                    <div className="ml-auto">
                      {alert.triggered ? (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">✓ Triggered</span>
                      ) : (
                        <span className="px-2 py-1 bg-zinc-700 text-zinc-400 text-xs rounded">Active</span>
                      )}
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
