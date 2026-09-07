import { useState } from 'react'
import NotificationDropdown from './NotificationDropdown'

interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
}

export default function Navbar({ onPostItem, activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navLinks = [
    { label: 'Find a Pair', section: 'findapair' as const, icon: '🔍' },
    { label: 'Free Items', section: 'freeitem' as const, icon: '🎁' },
    { label: 'Smart Features', section: null, href: '#smart', icon: '✨' },
    { label: 'How It Works', section: null, href: '#how', icon: '📖' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center glow-sm">
              <span className="text-slate-900 font-black text-sm">FP</span>
            </div>
            <span className="text-lg font-bold hidden sm:block">
              finda<span className="text-cyan-400">pair</span>
              <span className="text-slate-600 text-sm">.org</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.section && setActiveSection(link.section)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  link.section === activeSection
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {link.section ? (
                  link.label
                ) : (
                  <a href={link.href} className="flex items-center gap-1.5">
                    <span className="text-xs">{link.icon}</span>
                    {link.label}
                  </a>
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            
            <button
              onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
              className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-lg font-semibold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all glow-sm ripple-btn"
            >
              + Post Item
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-300/20 border border-cyan-500/30 flex items-center justify-center hover:border-cyan-500/50 transition-all"
              >
                <span className="text-sm font-bold text-cyan-400">U</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-56 glass rounded-xl overflow-hidden shadow-2xl animate-slide-down border border-cyan-500/20 z-50">
                  <div className="p-3 border-b border-cyan-500/10">
                    <p className="text-sm font-bold text-slate-100">Guest User</p>
                    <p className="text-xs text-slate-500">Trust Score: 85 ⭐</p>
                  </div>
                  <div className="py-1">
                    {['My Listings', 'My Matches', 'Wishlist', 'Eco Impact', 'Settings'].map((item) => (
                      <button key={item} className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-cyan-500/10">
                    <button className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                      Sign In / Sign Up →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 glass-light rounded-lg flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/10 animate-slide-down">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.section) {
                    setActiveSection(link.section)
                    setMobileMenuOpen(false)
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  link.section === activeSection
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onPostItem(activeSection === 'findapair' ? 'pair' : 'free'); setMobileMenuOpen(false); }}
              className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-lg font-semibold text-sm"
            >
              + Post Item
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
