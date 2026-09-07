import { useState } from 'react'

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
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

const defaultFilters: FilterState = {
  priceMin: 0,
  priceMax: 500,
  condition: [],
  location: '',
  radius: 50,
  verifiedOnly: false,
  sortBy: 'match',
}

export default function AdvancedFilters({ isOpen, onClose, onApply }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair']

  const toggleCondition = (condition: string) => {
    setFilters(prev => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition]
    }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="panel-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in mx-4 sm:mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 flex items-center justify-between" style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h3 className="text-[18px] font-semibold text-white">Advanced Filters</h3>
            <p className="text-[12px] text-zinc-500">Refine your search results</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-3 block">Price Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-zinc-500 mb-1 block">Min ($)</label>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 mb-1 block">Max ($)</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-3 block">Condition</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    filters.condition.includes(condition)
                      ? 'text-cyan-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  style={filters.condition.includes(condition) ? {
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  } : {
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-3 block">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="Enter city or zip code"
              className="input-field"
            />
            <div className="mt-3">
              <label className="text-[11px] text-zinc-500 mb-2 block">Search radius: {filters.radius} miles</label>
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
                <p className="text-[13px] text-white">Verified sellers only</p>
                <p className="text-[11px] text-zinc-500">Show only items from verified members</p>
              </div>
            </label>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-3 block">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="input-field"
            >
              <option value="match">Best match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest first</option>
              <option value="distance">Nearest first</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 flex gap-3" style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={handleReset} className="btn-secondary flex-1 !text-[13px]">
            Reset Filters
          </button>
          <button onClick={handleApply} className="btn-primary flex-1 !text-[13px]">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
