import type { Item } from '../lib/db'

interface PrintViewProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export default function PrintView({ item, isOpen, onClose }: PrintViewProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto" onClick={onClose}>
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center no-print">
        <h2 className="text-xl font-bold text-gray-900">Print Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            🖨️ Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="border-2 border-gray-300 rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FindAPair</h1>
            <p className="text-gray-600">Item Listing</p>
          </div>

          {/* Item Info */}
          <div className="mb-8">
            <div className="flex items-start gap-6">
              <div className="text-8xl">{item.emoji}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600">{item.category}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Condition:</span>
                    <span className="ml-2 text-gray-600">{item.condition}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-600">{item.location}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Posted:</span>
                    <span className="ml-2 text-gray-600">{new Date(item.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-cyan-600">
                {item.type === 'pair' ? `$${item.price}` : 'FREE'}
              </span>
              {item.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${item.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Seller Info */}
          <div className="mb-8 p-6 border-2 border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Seller Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-2xl font-bold text-white">
                {item.seller[0]}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{item.seller}</p>
                <p className="text-sm text-gray-600">Trust Score: {item.trustScore}/100</p>
                {item.verified && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    ✓ Verified Seller
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
            <p>Listed on FindAPair.org</p>
            <p className="mt-1">Printed on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
