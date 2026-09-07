import { useState, useEffect } from 'react'

interface SearchHistoryEntry {
  id: string
  query: string
  category: string
  timestamp: number
  resultCount: number
}

interface SearchHistoryProps {
  onApplySearch: (query: string, category: string) => void
}

export default function SearchHistory({ onApplySearch }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const addToHistory = (query: string, category: string, resultCount: number) => {
    if (!query.trim()) return
    
    const entry: SearchHistoryEntry = {
      id: Date.now().toString(),
      query,
      category,
      timestamp: Date.now(),
      resultCount,
    }

    // Remove duplicates and keep last 20
    const filtered = history.filter(h => h.query !== query)
    const updated = [entry, ...filtered].slice(0, 20)
    setHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('searchHistory')
  }

  const removeEntry = (id: string) => {
    const updated = history.filter(h => h.id !== id)
    setHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
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

  if (history.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <span>🕐</span>
        <span>Search History</span>
        <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px]">{history.length}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Recent Searches</h4>
            <button
              onClick={clearHistory}
              className="text-xs text-zinc-500 hover:text-red-400"
            >
              Clear All
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center gap-3 p-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 last:border-b-0"
              >
                <button
                  onClick={() => {
                    onApplySearch(entry.query, entry.category)
                    setIsOpen(false)
                  }}
                  className="flex-1 text-left"
                >
                  <div className="text-sm text-white">{entry.query}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-zinc-500">{entry.category}</span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="text-[10px] text-zinc-500">{entry.resultCount} results</span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="text-[10px] text-zinc-500">{formatTime(entry.timestamp)}</span>
                  </div>
                </button>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export type { SearchHistoryEntry }
export const searchHistoryUtils = {
  addToHistory: (query: string, category: string, resultCount: number) => {
    if (!query.trim()) return
    
    const stored = localStorage.getItem('searchHistory')
    const history: SearchHistoryEntry[] = stored ? JSON.parse(stored) : []
    
    const entry: SearchHistoryEntry = {
      id: Date.now().toString(),
      query,
      category,
      timestamp: Date.now(),
      resultCount,
    }

    const filtered = history.filter(h => h.query !== query)
    const updated = [entry, ...filtered].slice(0, 20)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  },
}
