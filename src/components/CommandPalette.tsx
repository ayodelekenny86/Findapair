import { useState, useEffect } from 'react'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function CommandPalette({ isOpen, onClose, onNavigate, onPostItem }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = [
    { id: 'navigate-findapair', label: 'Go to Find a Pair', icon: '🔍', action: () => onNavigate('findapair') },
    { id: 'navigate-freeitem', label: 'Go to FreeItem Network', icon: '🎁', action: () => onNavigate('freeitem') },
    { id: 'navigate-smart', label: 'Go to Smart Features', icon: '🧠', action: () => onNavigate('smart') },
    { id: 'navigate-how', label: 'Go to How It Works', icon: '📖', action: () => onNavigate('how') },
    { id: 'post-pair', label: 'Post a Solo Item', icon: '🔗', action: () => onPostItem('pair') },
    { id: 'post-free', label: 'List a Free Item', icon: '🎁', action: () => onPostItem('free') },
    { id: 'theme-toggle', label: 'Toggle Theme', icon: '🌓', action: () => document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark') },
    { id: 'scroll-top', label: 'Scroll to Top', icon: '⬆️', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'help', label: 'Show Keyboard Shortcuts', icon: '⌨️', action: () => alert('Keyboard shortcuts:\n\n/ - Open command palette\n? - Show this help\nEsc - Close modals\n1 - Go to Find a Pair\n2 - Go to FreeItem Network\nP - Post item') },
  ]

  const filteredCommands = query
    ? commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filteredCommands[selectedIndex]?.action()
        onClose()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="panel-elevated w-full max-w-xl animate-scale-in mx-4 sm:mx-auto" onClick={(e) => e.stopPropagation()}>
        {/* Search Input */}
        <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent outline-none text-[15px] text-white placeholder-zinc-500"
              autoFocus
            />
            <kbd className="px-2 py-1 rounded text-[10px] text-zinc-500" style={{ background: 'rgba(255,255,255,0.05)' }}>ESC</kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[13px] text-zinc-500">No commands found</p>
            </div>
          ) : (
            filteredCommands.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => { cmd.action(); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  i === selectedIndex ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                style={i === selectedIndex ? { background: 'rgba(6,182,212,0.1)' } : {}}
              >
                <span className="text-lg">{cmd.icon}</span>
                <span className="text-[13px] flex-1">{cmd.label}</span>
                {i === selectedIndex && (
                  <kbd className="px-1.5 py-0.5 rounded text-[9px] text-zinc-500" style={{ background: 'rgba(255,255,255,0.05)' }}>↵</kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 flex items-center justify-between text-[11px] text-zinc-600" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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
