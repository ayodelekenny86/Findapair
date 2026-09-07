import { useState, useEffect } from 'react'

interface KeyboardTutorialProps {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardTutorial({ isOpen, onClose }: KeyboardTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['1'], description: 'Switch to Find a Pair tab', icon: '🔍' },
        { keys: ['2'], description: 'Switch to FreeItem tab', icon: '🎁' },
        { keys: ['↑', '↓'], description: 'Navigate through items', icon: '⌨️' },
        { keys: ['Enter'], description: 'Open selected item', icon: '↵' },
      ],
    },
    {
      category: 'Actions',
      items: [
        { keys: ['P'], description: 'Post a new item', icon: '📝' },
        { keys: ['/'], description: 'Focus search box', icon: '🔍' },
        { keys: ['Esc'], description: 'Close modal / Clear search', icon: '✕' },
        { keys: ['?'], description: 'Show keyboard shortcuts', icon: '❓' },
      ],
    },
    {
      category: 'Advanced',
      items: [
        { keys: ['Ctrl', 'K'], description: 'Open command palette', icon: '⚡' },
        { keys: ['Ctrl', 'S'], description: 'Save current filters', icon: '💾' },
        { keys: ['Ctrl', 'E'], description: 'Export data', icon: '📤' },
        { keys: ['Ctrl', 'P'], description: 'Print item view', icon: '🖨️' },
      ],
    },
    {
      category: 'Bulk Operations',
      items: [
        { keys: ['Space'], description: 'Select/deselect item', icon: '☑️' },
        { keys: ['Ctrl', 'A'], description: 'Select all items', icon: '✅' },
        { keys: ['Delete'], description: 'Delete selected items', icon: '🗑️' },
        { keys: ['Ctrl', 'D'], description: 'Duplicate selected', icon: '📋' },
      ],
    },
  ]

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowRight' && currentStep < shortcuts.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (e.key === 'ArrowLeft' && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isOpen, currentStep])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">⌨️ Keyboard Shortcuts</h3>
            <p className="text-xs text-zinc-500 mt-1">Master FindAPair with keyboard navigation</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">✕</button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-zinc-800 overflow-x-auto">
          {shortcuts.map((category, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                currentStep === index
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Shortcuts List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {shortcuts[currentStep].items.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-zinc-800/30 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all"
              >
                <div className="text-2xl">{shortcut.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-white">{shortcut.description}</p>
                </div>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <kbd className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300 min-w-[2rem] text-center">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-zinc-600 text-xs">+</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>Use</span>
            <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px]">←</kbd>
            <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px]">→</kbd>
            <span>to navigate categories</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
