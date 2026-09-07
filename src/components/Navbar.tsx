import { useState } from 'react'
import NotificationDropdown from './NotificationDropdown'
import ThemeToggle from './ThemeToggle'
import { authService } from '../lib/auth'

interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
  activeTab: 'findapair' | 'freeitem'
  setActiveTab: (s: 'findapair' | 'freeitem') => void
  onShowShortcuts?: () => void
  onShowCommandPalette?: () => void
  onShowProfile?: () => void
  onShowNotifications?: () => void
  onShowExport?: () => void
  onShowAdminDashboard?: () => void
  onShowUserAccount?: () => void
  onShowLogin?: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({ onPostItem, activeTab, setActiveTab, onShowShortcuts, onShowCommandPalette, onShowProfile, onShowNotifications, onShowExport, onShowAdminDashboard, onShowUserAccount, onShowLogin, theme, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-3 sm:px-4 mt-3 sm:mt-4">
        <div
          className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl"
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
              onClick={() => setActiveTab('findapair')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'findapair'
                  ? 'text-white bg-white/5'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Find a Pair
            </button>
            <button
              onClick={() => setActiveTab('freeitem')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'freeitem'
                  ? 'text-white bg-white/5'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              FreeItem
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const event = new CustomEvent('openKeyboardTutorial')
                window.dispatchEvent(event)
              }}
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              title="Keyboard Shortcuts (?)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={onShowCommandPalette}
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              title="Search (⌘K)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={onShowNotifications}
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all relative"
              title="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {authService.isAdmin() && (
              <button
                onClick={onShowAdminDashboard}
                className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                title="Admin Dashboard"
              >
                👑
              </button>
            )}
            <button
              onClick={onShowUserAccount || onShowProfile}
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-300 text-black text-xs font-bold"
              title="My Account"
            >
              U
            </button>
            <button
              onClick={() => onPostItem(activeTab === 'findapair' ? 'pair' : 'free')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-[12px] sm:text-[13px] font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all"
            >
              <span className="hidden sm:inline">+ Post</span>
              <span className="sm:hidden">+</span>
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
            className="md:hidden max-w-5xl mx-auto mt-2 p-4 rounded-xl animate-slide-down"
            style={{
              background: 'rgba(10, 10, 11, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab('findapair'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-all ${
                  activeTab === 'findapair'
                    ? 'text-white bg-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                🔍 Find a Pair
              </button>
              <button
                onClick={() => { setActiveTab('freeitem'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-all ${
                  activeTab === 'freeitem'
                    ? 'text-white bg-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                🎁 FreeItem Network
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
