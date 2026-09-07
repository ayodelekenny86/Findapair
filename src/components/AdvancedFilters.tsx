import { useState } from 'react'

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
  currentFilters: FilterState
}

export interface FilterState {
  priceMin: number
  priceMax: number
  condition: string[]
  location: string
  radius: number
  verifiedOnly: boolean
  sortBy: string
}

export default function AdvancedFilters({ isOpen, onClose, onApply, currentFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters)

  if (!isOpen) return null

  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair']

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      priceMin: 0,
      priceMax: 1000,
      condition: [],
      location: '',
      radius: 50,
      verifiedOnly: false,
      sortBy: 'match',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-3 block">Price Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Min ($)</label>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Max ($)</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-3 block">Condition</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    const hasCondition = filters.condition.includes(condition)
                    setFilters({
                      ...filters,
                      condition: hasCondition
                        ? filters.condition.filter(c => c !== condition)
                        : [...filters.condition, condition]
                    })
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    filters.condition.includes(condition)
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-3 block">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="Enter city or zip code"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="mt-3">
              <label className="text-xs text-zinc-500 mb-2 block">Search radius: {filters.radius} miles</label>
              <input
                type="range"
                min="5"
                max="500"
                value={filters.radius}
                onChange={(e) => setFilters({ ...filters, radius: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Verified Only */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                className="w-4 h-4 accent-cyan-500"
              />
              <div>
                <span className="text-sm text-zinc-300">Verified sellers only</span>
                <p className="text-xs text-zinc-500">Show only items from verified members</p>
              </div>
            </label>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-3 block">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="match">Best match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest first</option>
              <option value="distance">Nearest first</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-zinc-800 flex gap-3 sticky bottom-0 bg-zinc-900">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
