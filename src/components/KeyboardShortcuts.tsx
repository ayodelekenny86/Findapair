interface KeyboardShortcutsProps {
  onClose: () => void
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: '1', description: 'Switch to Find a Pair' },
    { key: '2', description: 'Switch to FreeItem' },
    { key: 'P', description: 'Post new item' },
    { key: '/', description: 'Open search' },
    { key: '?', description: 'Show shortcuts' },
    { key: 'Esc', description: 'Close modal' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-zinc-800/50 rounded-lg">
              <span className="text-sm text-zinc-300">{shortcut.description}</span>
              <kbd className="px-2 py-1 text-xs font-mono text-cyan-400 bg-zinc-900 border border-zinc-700 rounded">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
          <p className="text-xs text-cyan-400">💡 Pro tip: Use keyboard shortcuts to navigate faster!</p>
        </div>
      </div>
    </div>
  )
}
