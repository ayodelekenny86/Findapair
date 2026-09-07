interface HeroProps {
  activeTab: 'findapair' | 'freeitem'
  setActiveTab: (tab: 'findapair' | 'freeitem') => void
}

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
        <div className="absolute top-20 right-1/3 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Ever Lost a Shoe or an Earring?
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-4 max-w-3xl mx-auto">
            They're expensive, so you don't want to throw them out — but they're useless without the mate.
          </p>
          <p className="text-lg text-purple-200 mb-10 max-w-2xl mx-auto">
            FindAPair lets you find or sell the mate of whatever you lost. Or give away unwanted items for free. No money ever changes hands in our FreeItem Network.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 mb-8">
            <button
              onClick={() => setActiveTab('findapair')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'findapair'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🔍 Find a Pair
            </button>
            <button
              onClick={() => setActiveTab('freeitem')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'freeitem'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🎁 FreeItem Network
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#listings"
              className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors shadow-xl"
            >
              Browse Listings
            </a>
            <a
              href="#how"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Floating item illustrations */}
        <div className="absolute -left-4 top-1/2 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
          <span className="text-5xl">👠</span>
        </div>
        <div className="absolute -right-4 top-1/3 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
          <span className="text-5xl">💎</span>
        </div>
        <div className="absolute left-1/6 bottom-10 hidden lg:block animate-bounce" style={{ animationDuration: '3.5s' }}>
          <span className="text-4xl">🧤</span>
        </div>
      </div>
    </section>
  )
}
