interface MobileNavProps {
  activeTab: 'findapair' | 'freeitem'
  setActiveTab: (tab: 'findapair' | 'freeitem') => void
  onPostItem: (type: 'pair' | 'free') => void
}

export default function MobileNav({ activeTab, setActiveTab, onPostItem }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 sm:hidden">
      <div className="flex items-center justify-around py-2">
        <button
          onClick={() => setActiveTab('findapair')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'findapair' ? 'text-cyan-400' : 'text-zinc-500'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] font-medium">Find</span>
        </button>

        <button
          onClick={() => onPostItem(activeTab === 'findapair' ? 'pair' : 'free')}
          className="flex flex-col items-center gap-1 px-6 py-2 -mt-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black rounded-full shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[10px] font-semibold">Post</span>
        </button>

        <button
          onClick={() => setActiveTab('freeitem')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'freeitem' ? 'text-cyan-400' : 'text-zinc-500'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <span className="text-[10px] font-medium">Free</span>
        </button>
      </div>
    </div>
  )
}
