import { useState } from 'react'
import NotificationDropdown from './NotificationDropdown'

interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
  onOpenDashboard?: () => void
  onOpenCommandPalette?: () => void
}

export default function Navbar({ onPostItem, activeSection, setActiveSection, onOpenDashboard, onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-3 sm:px-4 mt-3 sm:mt-4">
        <div
          className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl"
          style={{
            background: 'rgba(10, 10, 11, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
              <span className="text-xs sm:text-sm font-black text-black">fp</span>
            </div>
            <span className="font-semibold text-[13px] sm:text-[15px] tracking-tight text-white hidden sm:block">
              findapair<span className="text-zinc-500">.org</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
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
            <div className="hidden sm:block">
              <NotificationDropdown />
            </div>
            <button
              onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
              className="btn-primary !py-2 !px-3 sm:!px-4 !text-[12px] sm:!text-[13px]"
            >
              <span className="hidden sm:inline">Post item</span>
              <span className="sm:hidden">Post</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-xl animate-slide-down"
            style={{
              background: 'rgba(10, 10, 11, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveSection('findapair'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-all ${
                  activeSection === 'findapair'
                    ? 'text-white bg-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                🔍 Find a Pair
              </button>
              <button
                onClick={() => { setActiveSection('freeitem'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-all ${
                  activeSection === 'freeitem'
                    ? 'text-white bg-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                🎁 FreeItem Network
              </button>
              <a
                href="#smart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-[14px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all"
              >
                ✨ Features
              </a>
              <a
                href="#how"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-[14px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all"
              >
                📖 How it works
              </a>
              <div className="pt-2 mt-2 border-t border-white/5">
                <NotificationDropdown />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
