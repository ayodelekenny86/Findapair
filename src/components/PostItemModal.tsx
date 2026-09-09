import { useState } from 'react'

interface PostItemModalProps {
  type: 'pair' | 'free'
  onClose: () => void
  onSubmit?: (itemData: any) => void
}

export default function PostItemModal({ type, onClose, onSubmit }: PostItemModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<any>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const itemData = {
      type,
      title: data.get('title'),
      description: data.get('description'),
      category: data.get('category'),
      location: data.get('location'),
      price: data.get('price') ? Number(data.get('price')) : undefined,
      originalPrice: data.get('originalPrice') ? Number(data.get('originalPrice')) : undefined,
      condition: data.get('condition'),
      donationOption: data.get('donationOption') === 'on',
      emoji: type === 'pair' ? '💎' : '🎁',
    }
    onSubmit?.(itemData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
        <div className="panel-elevated max-w-md w-full p-8 text-center animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
            <span className="text-2xl">{type === 'pair' ? '🔗' : '🎁'}</span>
          </div>
          <h3 className="heading-md mb-2">{type === 'pair' ? 'Item posted!' : 'Free item listed!'}</h3>
          <p className="text-body mb-6">
            {type === 'pair' ? 'Our AI is scanning for potential matches. We\'ll notify you instantly!' : 'Your item is now live. Someone will claim it soon!'}
          </p>
          <button onClick={onClose} className="btn-primary">Done</button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="panel-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in mx-4 sm:mx-auto">
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h3 className="text-[16px] font-semibold text-white">
              {type === 'pair' ? '🔗 Post a solo item' : '🎁 List a free item'}
            </h3>
            <p className="text-[12px] text-zinc-500 mt-0.5">
              {type === 'pair' ? 'Find the mate of what you lost' : 'Give away something you don\'t need'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">
              {type === 'pair' ? 'What solo item do you have?' : 'What are you giving away?'}
            </label>
            <input type="text" name="title" required placeholder={type === 'pair' ? 'e.g., Left gold hoop earring, 14k' : 'e.g., IKEA bookshelf, white'} className="input-field" />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Description</label>
            <textarea name="description" required rows={3} placeholder={type === 'pair' ? 'Describe the item, condition, size, brand...' : 'Describe the item and pickup details...'} className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Category</label>
              <select name="category" className="input-field">
                {type === 'pair' ? (
                  <><option>Earrings</option><option>Shoes</option><option>Gloves</option><option>Glasses</option><option>Watches</option><option>Cufflinks</option><option>Other</option></>
                ) : (
                  <><option>Furniture</option><option>Electronics</option><option>Clothing</option><option>Books</option><option>Kitchen</option><option>Toys</option><option>Garden</option><option>Other</option></>
                )}
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Location</label>
              <input type="text" name="location" required placeholder="City, State" className="input-field" />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Condition</label>
            <select name="condition" className="input-field">
              <option>New</option>
              <option>Like New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>

          {type === 'pair' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Your price ($)</label>
                <input type="number" name="price" required placeholder="45" className="input-field" />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Original pair price ($)</label>
                <input type="number" name="originalPrice" placeholder="180" className="input-field" />
              </div>
            </div>
          )}

          {type === 'pair' && (
            <div className="p-4 rounded-lg" style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-cyan-400 text-sm">💰</span>
                <span className="text-[12px] font-semibold text-cyan-400">Smart price suggestion</span>
              </div>
              <p className="text-[12px] text-zinc-500">
                Based on similar items, we suggest pricing between <strong className="text-zinc-300">$30-$60</strong>. That's 68% off retail!
              </p>
            </div>
          )}

          {type === 'free' && (
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <input type="checkbox" name="donationOption" id="donation" className="w-4 h-4 accent-emerald-500" />
              <label htmlFor="donation" className="text-[13px] text-zinc-300 cursor-pointer">
                <span className="font-semibold text-emerald-400">♻️ Open to donation pickup</span>
                <br />
                <span className="text-[11px] text-zinc-500">Allow non-profits to collect if unclaimed in 7 days</span>
              </label>
            </div>
          )}

          <div>
            <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Your name</label>
            <input type="text" required placeholder="First name or username" className="input-field" />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Photo</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-cyan-500/30" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-3xl mb-2 block">📷</span>
              <p className="text-[13px] text-zinc-500">Drop an image here or click to upload</p>
              <p className="text-[11px] text-zinc-600 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full !py-3.5 !text-[14px]">
            {type === 'pair' ? '🔗 Post solo item' : '🎁 List free item'}
          </button>
        </form>
      </div>
    </div>
  )
}
