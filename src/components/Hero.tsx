interface HeroProps {
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function Hero({ activeSection, setActiveSection, onPostItem }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15), transparent 70%)' }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 animate-fade-in"
          style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.15)' }}
        >
          <span className="status-dot"></span>
          <span className="text-[11px] font-semibold tracking-wide text-cyan-400 uppercase">
            12,847 members online
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Find the mate of
          <br />
          <span className="gradient-text">what you lost.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-body max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Ever lost a shoe or an earring? They're expensive, so you don't want to throw them out — but they're useless without the mate. FindAPair connects you with someone who has the other half.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
            className="btn-primary !py-3.5 !px-7 !text-[14px]"
          >
            Post your item
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a href="#listings" className="btn-secondary !py-3.5 !px-7 !text-[14px]">
            Browse listings
          </a>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.4s', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setActiveSection('findapair')}
            className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              activeSection === 'findapair'
                ? 'text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            style={activeSection === 'findapair' ? { background: 'rgba(255,255,255,0.08)' } : {}}
          >
            🔍 Find a Pair
          </button>
          <button
            onClick={() => setActiveSection('freeitem')}
            className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              activeSection === 'freeitem'
                ? 'text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            style={activeSection === 'freeitem' ? { background: 'rgba(255,255,255,0.08)' } : {}}
          >
            🎁 FreeItem Network
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 text-[12px] text-zinc-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            AI-powered matching
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Trust-score verified
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            100% free to join
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Eco-friendly
          </span>
        </div>
      </div>
    </section>
  )
}
