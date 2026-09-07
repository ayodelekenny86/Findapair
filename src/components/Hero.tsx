interface HeroProps {
  activeTab: 'findapair' | 'freeitem'
  setActiveTab: (s: 'findapair' | 'freeitem') => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function Hero({ activeTab, setActiveTab, onPostItem }: HeroProps) {
  return (
    <section className="pt-24 pb-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
          <span className="text-[11px] font-semibold text-cyan-400">12,847 members online</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          Find the <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">mate</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mb-6">
          Lost a shoe or earring? Connect with someone who has the other half.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 p-1 rounded-lg mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setActiveTab('findapair')}
            className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
              activeTab === 'findapair' ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🔍 Find a Pair
          </button>
          <button
            onClick={() => setActiveTab('freeitem')}
            className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
              activeTab === 'freeitem' ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🎁 FreeItem
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            AI matching
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            Verified
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            Free to join
          </span>
        </div>
      </div>
    </section>
  )
}
