import { useState, useEffect } from 'react'

interface SavedSearch {
  id: string
  query: string
  category: string
  timestamp: number
}

interface SavedSearchesProps {
  onApplySearch: (query: string, category: string) => void
}

export default function SavedSearches({ onApplySearch }: SavedSearchesProps) {
  const [searches, setSearches] = useState<SavedSearch[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('All')

  useEffect(() => {
    const stored = localStorage.getItem('savedSearches')
    if (stored) {
      setSearches(JSON.parse(stored))
    }
  }, [])

  const saveCurrentSearch = () => {
    if (!currentQuery.trim()) return

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query: currentQuery,
      category: currentCategory,
      timestamp: Date.now(),
    }

    const updated = [newSearch, ...searches].slice(0, 10) // Keep last 10
    setSearches(updated)
    localStorage.setItem('savedSearches', JSON.stringify(updated))
  }

  const deleteSearch = (id: string) => {
    const updated = searches.filter(s => s.id !== id)
    setSearches(updated)
    localStorage.setItem('savedSearches', JSON.stringify(updated))
  }

  const applySearch = (search: SavedSearch) => {
    onApplySearch(search.query, search.category)
  }

  if (searches.length === 0) {
    return null
  }

  return (
    <section className="py-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">⭐ Saved Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <div
            key={search.id}
            className="group flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-cyan-500/30 transition-all"
          >
            <button
              onClick={() => applySearch(search)}
              className="text-xs text-zinc-300 hover:text-cyan-400"
            >
              {search.query}
              {search.category !== 'All' && (
                <span className="ml-1 text-[10px] text-zinc-500">({search.category})</span>
              )}
            </button>
            <button
              onClick={() => deleteSearch(search.id)}
              className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export function useSavedSearches() {
  const [currentQuery, setCurrentQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('All')

  return {
    currentQuery,
    setCurrentQuery,
    currentCategory,
    setCurrentCategory,
  }
}
