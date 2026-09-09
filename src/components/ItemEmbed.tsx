import type { Item } from '../lib/db'

interface ItemEmbedProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export default function ItemEmbed({ item, isOpen, onClose }: ItemEmbedProps) {
  if (!isOpen) return null

  const embedCode = `
<iframe
  src="https://findapair.org/embed/${item.id}"
  width="400"
  height="300"
  frameborder="0"
  style="border: 1px solid #27272a; border-radius: 8px;"
  allowfullscreen
></iframe>
  `.trim()

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">🔗 Embed Item</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">✕</button>
        </div>

        <div className="mb-4 p-4 bg-zinc-800/50 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Preview</h4>
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{item.emoji}</div>
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-white mb-1">{item.title}</h5>
                <p className="text-xs text-zinc-400 mb-2">{item.description.slice(0, 100)}...</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-cyan-400">
                    {item.type === 'pair' ? `$${item.price}` : 'FREE'}
                  </span>
                  <span className="text-xs text-zinc-500">on FindAPair</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Embed Code</h4>
          <textarea
            readOnly
            value={embedCode}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-300 font-mono resize-none"
            rows={6}
          />
        </div>

        <button
          onClick={copyEmbed}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300"
        >
          📋 Copy Embed Code
        </button>
      </div>
    </div>
  )
}
