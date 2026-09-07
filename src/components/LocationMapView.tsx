import type { Item } from '../lib/db'

interface LocationMapViewProps {
  items: Item[]
  onSelectItem: (item: Item) => void
}

export default function LocationMapView({ items, onSelectItem }: LocationMapViewProps) {
  // Simulate map with items positioned based on location
  const getLocationPosition = (location: string) => {
    // Simple hash function to generate consistent positions
    const hash = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const x = (hash % 80) + 10 // 10-90%
    const y = ((hash * 7) % 80) + 10 // 10-90%
    return { x, y }
  }

  return (
    <section className="py-8">
      <h3 className="text-sm font-semibold text-zinc-400 mb-4">🗺️ Location Map</h3>
      <div className="relative bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {/* Map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {/* Items as markers */}
        {items.map((item) => {
          const pos = getLocationPosition(item.location)
          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center text-lg hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    <div className="text-xs font-medium text-white">{item.title}</div>
                    <div className="text-[10px] text-zinc-500">{item.location}</div>
                    <div className="text-xs text-cyan-400 font-semibold mt-1">
                      {item.type === 'pair' ? `$${item.price}` : 'FREE'}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-zinc-900/90 border border-zinc-800 rounded-lg px-3 py-2">
          <div className="text-xs text-zinc-400">{items.length} items shown</div>
        </div>
      </div>
    </section>
  )
}
