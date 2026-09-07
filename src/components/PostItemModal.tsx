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
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass rounded-3xl max-w-md w-full p-8 text-center glow">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center">
            <span className="text-3xl">{type === 'pair' ? '🔗' : '🎁'}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-100 mb-2">
            {type === 'pair' ? 'Item Posted!' : 'Free Item Listed!'}
          </h3>
          <p className="text-slate-400 mb-6">
            {type === 'pair'
              ? 'Our AI is already scanning for potential matches. We\'ll notify you the moment someone has the mate!'
              : 'Your item is now live on the FreeItem Network. Someone will claim it soon!'}
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-cyan-500/10 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md rounded-t-3xl z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-100">
              {type === 'pair' ? '🔗 Post a Solo Item' : '🎁 List a Free Item'}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {type === 'pair' ? 'Find the mate of what you lost' : 'Give away something you don\'t need'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              {type === 'pair' ? 'What solo item do you have?' : 'What are you giving away?'}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'pair' ? 'e.g., Left gold hoop earring, 14k' : 'e.g., IKEA bookshelf, white'}
              className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              placeholder={type === 'pair' ? 'Describe the item, condition, size, brand, and what mate you need...' : 'Describe the item, condition, and pickup details...'}
              className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">Category</label>
              <select className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-300 outline-none">
                {type === 'pair' ? (
                  <>
                    <option>Earrings</option>
                    <option>Shoes</option>
                    <option>Gloves</option>
                    <option>Glasses</option>
                    <option>Watches</option>
                    <option>Buttons</option>
                    <option>Cufflinks</option>
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
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">Location</label>
              <input
                type="text"
                required
                placeholder="City, State"
                className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
              />
            </div>
          </div>

          {type === 'pair' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Your Price</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., $45"
                  className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Original Pair Price</label>
                <input
                  type="text"
                  placeholder="e.g., $180"
                  className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {type === 'pair' && (
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-400">💰</span>
                <span className="text-sm font-semibold text-cyan-400">Smart Price Suggestion</span>
              </div>
              <p className="text-xs text-slate-400">
                Based on similar items, we suggest pricing between <strong className="text-slate-200">$30-$60</strong> for the best chance of finding a buyer. That's still 68% off retail!
              </p>
            </div>
          )}

          {type === 'free' && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <input
                type="checkbox"
                id="donation"
                className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
              />
              <label htmlFor="donation" className="text-sm text-slate-300 cursor-pointer">
                <span className="font-semibold text-emerald-400">♻️ Open to donation pickup</span>
                <br />
                <span className="text-slate-500 text-xs">Allow non-profits to collect if unclaimed in 7 days</span>
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Your Name</label>
            <input
              type="text"
              required
              placeholder="First name or username"
              className="w-full px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Photo</label>
            <div className="border-2 border-dashed border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/40 transition-colors cursor-pointer bg-slate-800/30">
              <span className="text-4xl mb-2 block">📷</span>
              <p className="text-sm text-slate-400">Drop an image here or click to upload</p>
              <p className="text-xs text-slate-600 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {type === 'free' && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-sm font-semibold text-slate-300 mb-2">📋 FreeItem Network Rules:</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-green-400">✓</span> Item must be completely free — no money changes hands
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-green-400">✓</span> Item must be legal to own and give away
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-green-400">✓</span> Content must be appropriate for all ages
                </li>
              </ul>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              type === 'pair'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 hover:from-cyan-400 hover:to-cyan-300 glow-sm'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-900 hover:from-emerald-400 hover:to-emerald-300'
            }`}
          >
            {type === 'pair' ? '🔗 Post Solo Item' : '🎁 List Free Item'}
          </button>
        </form>
      </div>
    </div>
  )
}
