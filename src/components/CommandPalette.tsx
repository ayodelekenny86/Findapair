import { useState, useEffect, useRef } from 'react'

interface CommandPaletteProps {
  onClose: () => void
  onNavigate: (tab: 'findapair' | 'freeitem') => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function CommandPalette({ onClose, onNavigate, onPostItem }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = [
    { id: 'findapair', label: 'Find a Pair', icon: '🔍', action: () => onNavigate('findapair') },
    { id: 'freeitem', label: 'FreeItem Network', icon: '🎁', action: () => onNavigate('freeitem') },
    { id: 'post-pair', label: 'Post Solo Item', icon: '📝', action: () => onPostItem('pair') },
    { id: 'post-free', label: 'Post Free Item', icon: '📦', action: () => onPostItem('free') },
  ]

  const filtered = query
    ? commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault()
        filtered[selectedIndex].action()
        onClose()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Search Input */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-zinc-500"
            />
            <kbd className="px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
              ESC
            </kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-500">No commands found</p>
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => { cmd.action(); onClose() }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  i === selectedIndex ? 'bg-cyan-500/10 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'
                }`}
              >
                <span className="text-lg">{cmd.icon}</span>
                <span className="text-sm flex-1">{cmd.label}</span>
                {i === selectedIndex && (
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
                    ↵
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-600">
          <div className="flex gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Powered by FindAPair</span>
        </div>
      </div>
    </div>
  )
}
