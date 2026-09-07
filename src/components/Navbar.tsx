interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
}

export default function Navbar({ onPostItem, activeSection, setActiveSection }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center glow-sm">
              <span className="text-slate-900 font-bold text-sm">FP</span>
            </div>
            <span className="text-lg font-bold">
              finda<span className="text-cyan-400">pair</span>
              <span className="text-slate-500 text-sm">.org</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveSection('findapair')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === 'findapair'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              🔍 Find a Pair
            </button>
            <button
              onClick={() => setActiveSection('freeitem')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === 'freeitem'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              🎁 FreeItem Network
            </button>
            <a href="#smart" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all">
              ✨ Smart Features
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Live</span>
            </button>
            <button
              onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-lg font-semibold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all glow-sm"
            >
              + Post Item
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
