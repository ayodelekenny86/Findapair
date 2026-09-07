import { useState, useEffect, useRef } from 'react'

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
  visible: boolean
}

export default function SearchSuggestions({ query, onSelect, visible }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length > 0) {
      generateSuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const generateSuggestions = (q: string) => {
    const commonSearches = [
      'gold earring',
      'nike shoe',
      'diamond ring',
      'silver bracelet',
      'leather glove',
      'watch band',
      'pearl necklace',
      'sneaker',
      'boot',
      'sandals',
      'earrings pair',
      'vintage',
      'designer',
      'limited edition',
      'rare',
    ]

    const filtered = commonSearches
      .filter(s => s.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 5)

    setSuggestions(filtered)
  }

  if (!visible || suggestions.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden"
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-3 border-b border-zinc-800 last:border-b-0"
        >
          <span className="text-zinc-500">🔍</span>
          <span>{suggestion}</span>
        </button>
      ))}
    </div>
  )
}
