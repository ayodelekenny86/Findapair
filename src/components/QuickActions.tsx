import { useState } from 'react'

interface QuickActionsProps {
  onPostItem: () => void
  onOpenWishlist: () => void
  onOpenCommandPalette: () => void
  onToggleTheme: () => void
}

export default function QuickActions({ onPostItem, onOpenWishlist, onOpenCommandPalette, onToggleTheme }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: '📝', label: 'Post Item', action: onPostItem, color: 'from-cyan-500 to-cyan-400' },
    { icon: '❤️', label: 'Wishlist', action: onOpenWishlist, color: 'from-red-500 to-red-400' },
    { icon: '🔍', label: 'Search', action: onOpenCommandPalette, color: 'from-purple-500 to-purple-400' },
    { icon: '🌓', label: 'Theme', action: onToggleTheme, color: 'from-amber-500 to-amber-400' },
  ]

  return (
    <div className="fixed bottom-24 right-6 z-40 sm:bottom-6">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2 animate-slide-up">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.action()
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-black rounded-lg shadow-lg hover:scale-105 transition-transform whitespace-nowrap`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen
            ? 'bg-zinc-800 rotate-45'
            : 'bg-gradient-to-r from-cyan-500 to-cyan-400 hover:scale-110'
        }`}
      >
        <svg className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
