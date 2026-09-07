import { useState, useEffect } from 'react'
import type { FilterState } from './AdvancedFilters'

interface SavedFilterPreset {
  id: string
  name: string
  filters: FilterState
  createdAt: number
}

interface SavedFilterPresetsProps {
  currentFilters: FilterState
  onApplyPreset: (filters: FilterState) => void
}

export default function SavedFilterPresets({ currentFilters, onApplyPreset }: SavedFilterPresetsProps) {
  const [presets, setPresets] = useState<SavedFilterPreset[]>([])
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [presetName, setPresetName] = useState('')

  useEffect(() => {
    loadPresets()
  }, [])

  const loadPresets = () => {
    const stored = localStorage.getItem('filterPresets')
    if (stored) {
      setPresets(JSON.parse(stored))
    }
  }

  const savePresets = (updated: SavedFilterPreset[]) => {
    setPresets(updated)
    localStorage.setItem('filterPresets', JSON.stringify(updated))
  }

  const savePreset = () => {
    if (!presetName.trim()) return

    const preset: SavedFilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      filters: currentFilters,
      createdAt: Date.now(),
    }

    savePresets([preset, ...presets])
    setPresetName('')
    setShowSaveForm(false)
  }

  const deletePreset = (id: string) => {
    savePresets(presets.filter(p => p.id !== id))
  }

  if (presets.length === 0 && !showSaveForm) return null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-400">💾 Saved Filters</h3>
        <button
          onClick={() => setShowSaveForm(!showSaveForm)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          {showSaveForm ? 'Cancel' : '+ Save Current'}
        </button>
      </div>

      {showSaveForm && (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name..."
            className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={savePreset}
            className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
          >
            Save
          </button>
        </div>
      )}

      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="group flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-cyan-500/30 transition-all"
            >
              <button
                onClick={() => onApplyPreset(preset.filters)}
                className="text-xs text-zinc-300 hover:text-cyan-400"
              >
                {preset.name}
              </button>
              <button
                onClick={() => deletePreset(preset.id)}
                className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
