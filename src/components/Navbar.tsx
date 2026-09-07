import NotificationDropdown from './NotificationDropdown'

interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
}

export default function Navbar({ onPostItem, activeSection, setActiveSection }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div
          className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            background: 'rgba(10, 10, 11, 0.8)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
              <span className="text-sm font-black text-black">fp</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white hidden sm:block">
              findapair<span className="text-zinc-500">.org</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveSection('findapair')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                activeSection === 'findapair'
                  ? 'text-white bg-white/5'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Find a Pair
            </button>
            <button
              onClick={() => setActiveSection('freeitem')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                activeSection === 'freeitem'
                  ? 'text-white bg-white/5'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              FreeItem
            </button>
            <a href="#smart" className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-all">
              Features
            </a>
            <a href="#how" className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-all">
              How it works
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            <button
              onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
              className="btn-primary !py-2 !px-4 !text-[13px]"
            >
              Post item
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
