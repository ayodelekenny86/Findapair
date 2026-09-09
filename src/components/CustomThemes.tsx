import { useState, useEffect } from 'react'

interface Theme {
  id: string
  name: string
  primary: string
  accent: string
  preview: string
}

const themes: Theme[] = [
  { id: 'cyan', name: 'Cyan (Default)', primary: '#06b6d4', accent: '#22d3ee', preview: 'bg-cyan-500' },
  { id: 'purple', name: 'Purple', primary: '#8b5cf6', accent: '#a78bfa', preview: 'bg-purple-500' },
  { id: 'rose', name: 'Rose', primary: '#f43f5e', accent: '#fb7185', preview: 'bg-rose-500' },
  { id: 'amber', name: 'Amber', primary: '#f59e0b', accent: '#fbbf24', preview: 'bg-amber-500' },
  { id: 'emerald', name: 'Emerald', primary: '#10b981', accent: '#34d399', preview: 'bg-emerald-500' },
  { id: 'blue', name: 'Blue', primary: '#3b82f6', accent: '#60a5fa', preview: 'bg-blue-500' },
  { id: 'pink', name: 'Pink', primary: '#ec4899', accent: '#f472b6', preview: 'bg-pink-500' },
  { id: 'indigo', name: 'Indigo', primary: '#6366f1', accent: '#818cf8', preview: 'bg-indigo-500' },
]

interface CustomThemesProps {
  isOpen: boolean
  onClose: () => void
}

export default function CustomThemes({ isOpen, onClose }: CustomThemesProps) {
  const [activeTheme, setActiveTheme] = useState('cyan')

  useEffect(() => {
    const saved = localStorage.getItem('customTheme')
    if (saved) setActiveTheme(saved)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('customTheme')
      if (saved) setActiveTheme(saved)
    }
  }, [isOpen])

  const applyTheme = (themeId: string) => {
    setActiveTheme(themeId)
    localStorage.setItem('customTheme', themeId)
    
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      document.documentElement.style.setProperty('--theme-primary', theme.primary)
      document.documentElement.style.setProperty('--theme-accent', theme.accent)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">🎨 Custom Themes</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeTheme === theme.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full ${theme.preview}`}></div>
                <span className="text-sm font-medium text-white">{theme.name}</span>
              </div>
              <div className="flex gap-1">
                <div className="h-2 flex-1 rounded" style={{ background: theme.primary }}></div>
                <div className="h-2 flex-1 rounded" style={{ background: theme.accent }}></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
          <p className="text-xs text-zinc-400">
            💡 Theme changes apply immediately and persist across sessions.
          </p>
        </div>
      </div>
    </div>
  )
}
