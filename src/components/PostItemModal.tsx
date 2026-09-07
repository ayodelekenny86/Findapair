import { useState } from 'react'

interface PostItemModalProps {
  type: 'pair' | 'free'
  onClose: () => void
}

export default function PostItemModal({ type, onClose }: PostItemModalProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
          <span className="text-6xl mb-4 block">{type === 'pair' ? '🔗' : '🎁'}</span>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'pair' ? 'Item Posted!' : 'Free Item Listed!'}
          </h3>
          <p className="text-gray-600 mb-6">
            {type === 'pair'
              ? 'Your solo item is now visible to the community. We\'ll notify you when someone has the mate!'
              : 'Your item is now listed on the FreeItem Network. Someone will claim it soon!'}
          </p>
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
          <h3 className="text-xl font-bold text-gray-900">
            {type === 'pair' ? '🔗 Post a Solo Item' : '🎁 List a Free Item'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {type === 'pair' ? 'What solo item do you have?' : 'What are you giving away?'}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'pair' ? 'e.g., Left gold hoop earring, 14k' : 'e.g., IKEA bookshelf, white'}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              placeholder={type === 'pair' ? 'Describe the item, condition, size, brand, and what mate you\'re looking for...' : 'Describe the item, condition, and any pickup details...'}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all">
                {type === 'pair' ? (
                  <>
                    <option>Earrings</option>
                    <option>Shoes</option>
                    <option>Gloves</option>
                    <option>Glasses</option>
                    <option>Watches</option>
                    <option>Buttons</option>
                    <option>Other</option>
                  </>
                ) : (
                  <>
                    <option>Furniture</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Books</option>
                    <option>Kitchen</option>
                    <option>Toys</option>
                    <option>Garden</option>
                    <option>Other</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
              <input
                type="text"
                required
                placeholder="City, State"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {type === 'pair' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Price</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., $45"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original Pair Price</label>
                <input
                  type="text"
                  placeholder="e.g., $180"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {type === 'free' && (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <input
                type="checkbox"
                id="donation"
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <label htmlFor="donation" className="text-sm text-gray-700">
                <span className="font-semibold">♻️ Open to donation pickup</span>
                <br />
                <span className="text-gray-500">Allow non-profits to collect this item if unclaimed</span>
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
            <input
              type="text"
              required
              placeholder="First name or username"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Photo (optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 transition-colors cursor-pointer">
              <span className="text-3xl mb-2 block">📷</span>
              <p className="text-sm text-gray-500">Click to upload a photo of your item</p>
            </div>
          </div>

          {type === 'free' && (
            <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
              <p className="font-semibold text-gray-700 mb-1">📋 FreeItem Network Rules:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Item must be completely free — no money changes hands</li>
                <li>Item must be legal to own and give away</li>
                <li>Content must be appropriate for all ages</li>
              </ul>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-colors ${
              type === 'pair'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {type === 'pair' ? 'Post Solo Item' : 'List Free Item'}
          </button>
        </form>
      </div>
    </div>
  )
}
