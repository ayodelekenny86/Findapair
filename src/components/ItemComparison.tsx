import type { Item } from '../lib/db'

interface ItemComparisonProps {
  items: Item[]
  onRemove: (id: string) => void
  onClose: () => void
}

export default function ItemComparison({ items, onRemove, onClose }: ItemComparisonProps) {
  if (items.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Compare Items</h3>
            <p className="text-xs text-zinc-500">{items.length} items selected</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(250px, 1fr))` }}>
              {items.map((item) => (
                <div key={item.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{item.emoji}</div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-zinc-500 hover:text-red-400 text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Item Details */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Title</div>
                      <div className="text-sm text-white font-medium">{item.title}</div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Category</div>
                      <div className="text-sm text-zinc-300">{item.category}</div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Condition</div>
                      <div className="text-sm text-zinc-300">{item.condition}</div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Price</div>
                      <div className="text-lg font-bold text-cyan-400">
                        {item.type === 'pair' ? `$${item.price}` : 'FREE'}
                      </div>
                      {item.originalPrice && (
                        <div className="text-xs text-zinc-500 line-through">${item.originalPrice}</div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Location</div>
                      <div className="text-sm text-zinc-300">{item.location}</div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Match Score</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                            style={{ width: `${item.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-cyan-400 font-semibold">{item.matchScore}%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Seller</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-[10px] font-bold text-black">
                          {item.seller[0]}
                        </div>
                        <span className="text-sm text-zinc-300">{item.seller}</span>
                        {item.verified && (
                          <span className="text-xs text-emerald-400">✓</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Stats</div>
                      <div className="flex gap-3 text-xs text-zinc-400">
                        <span>👁 {item.views}</span>
                        <span>❤️ {item.saves}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Posted</div>
                      <div className="text-xs text-zinc-400">{item.postedAgo}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
