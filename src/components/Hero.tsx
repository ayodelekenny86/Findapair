interface HeroProps {
  activeSection: 'findapair' | 'freeitem'
  setActiveSection: (s: 'findapair' | 'freeitem') => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function Hero({ activeSection, setActiveSection, onPostItem }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-cyan-300 font-medium">12,847 members online now</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Ever Lost a{' '}
            <span className="gradient-text text-glow">Shoe</span> or an{' '}
            <span className="gradient-text text-glow">Earring</span>?
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            They're expensive, so you don't want to throw them out — but they're useless without the mate.
          </p>

          <p className="text-base text-slate-500 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            FindAPair connects you with people who have the other half. Or give away unwanted items for free. No money ever changes hands in our FreeItem Network.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onPostItem(activeSection === 'findapair' ? 'pair' : 'free')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-cyan-300 transition-all glow"
            >
              Post Your Item →
            </button>
            <a
              href="#listings"
              className="px-8 py-4 glass rounded-xl font-bold text-lg text-slate-200 hover:bg-slate-800/70 transition-all"
            >
              Browse Listings
            </a>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {['AI Match Engine', 'Trust Scores', 'Free Forever', 'Eco Impact'].map((feature) => (
              <span key={feature} className="px-4 py-2 glass-light rounded-full text-sm text-slate-400">
                ✦ {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-32 left-8 hidden lg:block animate-float">
          <div className="glass rounded-2xl p-3 glow-sm">
            <span className="text-3xl">👠</span>
          </div>
        </div>
        <div className="absolute top-48 right-12 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
          <div className="glass rounded-2xl p-3 glow-sm">
            <span className="text-3xl">💎</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-20 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
          <div className="glass rounded-2xl p-3 glow-sm">
            <span className="text-3xl">🧤</span>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 hidden lg:block animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="glass rounded-2xl p-3 glow-sm">
            <span className="text-3xl">⌚</span>
          </div>
        </div>
      </div>
    </section>
  )
}
