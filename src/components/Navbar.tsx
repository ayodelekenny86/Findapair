import { useState } from 'react'

interface NavbarProps {
  onPostItem: (type: 'pair' | 'free') => void
}

export default function Navbar({ onPostItem }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🔗</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              finda<span className="text-purple-600">pair</span>.org
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#findapair" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Find a Pair</a>
            <a href="#freeitem" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">FreeItem Network</a>
            <a href="#how" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">How It Works</a>
            <button
              onClick={() => onPostItem('pair')}
              className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              + Post Item
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col gap-3 pt-4">
              <a href="#findapair" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium">Find a Pair</a>
              <a href="#freeitem" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium">FreeItem Network</a>
              <a href="#how" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium">How It Works</a>
              <button
                onClick={() => { onPostItem('pair'); setMobileMenuOpen(false) }}
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 mx-3"
              >
                + Post Item
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
