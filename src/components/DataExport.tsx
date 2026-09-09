import { useState } from 'react'
import { db } from '../lib/db'

interface DataExportProps {
  isOpen: boolean
  onClose: () => void
}

export default function DataExport({ isOpen, onClose }: DataExportProps) {
  const [exporting, setExporting] = useState(false)

  if (!isOpen) return null

  const exportData = (format: 'json' | 'csv') => {
    setExporting(true)

    const user = db.getCurrentUser()
    const items = db.getItems().filter(i => i.sellerId === user.id)
    const activities = db.getActivities()

    const data = {
      user: {
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
        trustScore: user.trustScore,
        itemsPosted: user.itemsPosted,
        itemsMatched: user.itemsMatched,
      },
      items: items.map(item => ({
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        condition: item.condition,
        location: item.location,
        postedAt: new Date(item.postedAt).toISOString(),
        status: item.status,
        views: item.views,
        saves: item.saves,
      })),
      activities: activities.map(activity => ({
        type: activity.type,
        message: activity.message,
        timestamp: new Date(activity.timestamp).toISOString(),
      })),
      exportedAt: new Date().toISOString(),
    }

    let content: string
    let filename: string
    let mimeType: string

    if (format === 'json') {
      content = JSON.stringify(data, null, 2)
      filename = `findapair-export-${Date.now()}.json`
      mimeType = 'application/json'
    } else {
      // CSV format
      const csvRows = [
        ['Type', 'Title', 'Description', 'Category', 'Price', 'Condition', 'Location', 'Posted At', 'Status', 'Views', 'Saves'],
        ...items.map(item => [
          item.type,
          item.title,
          item.description,
          item.category,
          item.price || '',
          item.condition,
          item.location,
          new Date(item.postedAt).toISOString(),
          item.status,
          item.views,
          item.saves,
        ]),
      ]
      content = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
      filename = `findapair-export-${Date.now()}.csv`
      mimeType = 'text/csv'
    }

    // Download file
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setTimeout(() => setExporting(false), 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Export Data</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-zinc-400">
            Download your data including profile information, posted items, and activity history.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => exportData('json')}
              disabled={exporting}
              className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">JSON Format</div>
                  <div className="text-xs text-zinc-500">Structured data, easy to import</div>
                </div>
              </div>
              <span className="text-xs text-zinc-500">→</span>
            </button>

            <button
              onClick={() => exportData('csv')}
              disabled={exporting}
              className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">CSV Format</div>
                  <div className="text-xs text-zinc-500">Spreadsheet compatible</div>
                </div>
              </div>
              <span className="text-xs text-zinc-500">→</span>
            </button>
          </div>

          {exporting && (
            <div className="text-center py-2">
              <div className="inline-block w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-zinc-500 mt-2">Exporting...</p>
            </div>
          )}

          <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <p className="text-xs text-cyan-400">
              💡 Your data is stored locally and never leaves your device unless you export it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
