import { useState } from 'react'
import type { Toast } from './Toast'

interface FindAPairSectionProps {
  onPostItem: (type: 'pair' | 'free') => void
  addToast?: (toast: Omit<Toast, 'id'>) => void
}

interface PairItem {
  id: number
  title: string
  description: string
  category: string
  emoji: string
  location: string
  postedAgo: string
  seller: string
  price: number
  originalPrice: number
  matchScore: number
  verified: boolean
  hasPhoto: boolean
  condition: string
}

const categories = [
  { name: 'All', icon: '🔍' },
  { name: 'Earrings', icon: '💎' },
  { name: 'Shoes', icon: '👠' },
  { name: 'Gloves', icon: '🧤' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Glasses', icon: '👓' },
  { name: 'Buttons', icon: '🔘' },
  { name: 'Cufflinks', icon: '✨' },
]

const pairItems: PairItem[] = [
  {
    id: 1,
    title: 'Left Gold Hoop Earring - 14k',
    description: 'Lost the right one at a concert. 14k gold, medium size hoop. Looking for an identical match or similar style.',
    category: 'Earrings',
    emoji: '💎',
    location: 'Manhattan, NY',
    postedAgo: '2 hours ago',
    seller: 'Sarah K.',
    price: 85,
    originalPrice: 320,
    matchScore: 94,
    verified: true,
    hasPhoto: true,
    condition: 'Excellent',
  },
  {
    id: 2,
    title: 'Right Nike Air Max - Size 10',
    description: 'My dog chewed the left one! Brand new Nike Air Max 90, black/white. Size 10 US. Only worn twice.',
    category: 'Shoes',
    emoji: '👟',
    location: 'Brooklyn, NY',
    postedAgo: '5 hours ago',
    seller: 'Mike R.',
    price: 45,
    originalPrice: 130,
    matchScore: 88,
    verified: true,
    hasPhoto: true,
    condition: 'Like New',
  },
  {
    id: 3,
    title: 'Single Cashmere Glove - Left',
    description: 'Left behind on the subway. Pure cashmere, charcoal gray, women\'s medium. Brand: Everlane.',
    category: 'Gloves',
    emoji: '🧤',
    location: 'Chicago, IL',
    postedAgo: '1 day ago',
    seller: 'Lisa M.',
    price: 25,
    originalPrice: 78,
    matchScore: 91,
    verified: false,
    hasPhoto: true,
    condition: 'Good',
  },
  {
    id: 4,
    title: 'Pearl Stud Earring - Right',
    description: 'Real freshwater pearl, sterling silver post. Lost the left one. Pearl is about 8mm diameter.',
    category: 'Earrings',
    emoji: '🦪',
    location: 'San Francisco, CA',
    postedAgo: '3 hours ago',
    seller: 'Emma T.',
    price: 40,
    originalPrice: 150,
    matchScore: 96,
    verified: true,
    hasPhoto: true,
    condition: 'Excellent',
  },
  {
    id: 5,
    title: 'Left Ray-Ban Aviator Lens',
    description: 'Cracked my right lens and need a replacement. Classic green Ray-Ban aviators, model RB3025.',
    category: 'Glasses',
    emoji: '👓',
    location: 'Austin, TX',
    postedAgo: '6 hours ago',
    seller: 'David P.',
    price: 30,
    originalPrice: 163,
    matchScore: 82,
    verified: true,
    hasPhoto: true,
    condition: 'Good',
  },
  {
    id: 6,
    title: 'Silver Cufflink - Single',
    description: 'Tiffany & Co. silver cufflink with blue enamel. Gift from my father, looking for the matching pair.',
    category: 'Cufflinks',
    emoji: '✨',
    location: 'Boston, MA',
    postedAgo: '12 hours ago',
    seller: 'James W.',
    price: 65,
    originalPrice: 225,
    matchScore: 89,
    verified: true,
    hasPhoto: true,
    condition: 'Excellent',
  },
  {
    id: 7,
    title: 'Left Adidas Ultraboost - Size 9',
    description: 'Core black Ultraboost 22. Left shoe only. Worn about 10 times. Sole still in great condition.',
    category: 'Shoes',
    emoji: '👟',
    location: 'Portland, OR',
    postedAgo: '1 day ago',
    seller: 'Alex N.',
    price: 35,
    originalPrice: 190,
    matchScore: 85,
    verified: false,
    hasPhoto: true,
    condition: 'Good',
  },
  {
    id: 8,
    title: 'Diamond Stud Earring - Left',
    description: '0.25ct diamond, white gold setting. Insurance covered the pair but I want to find the mate.',
    category: 'Earrings',
    emoji: '💍',
    location: 'Miami, FL',
    postedAgo: '4 hours ago',
    seller: 'Rachel G.',
    price: 200,
    originalPrice: 850,
    matchScore: 97,
    verified: true,
    hasPhoto: true,
    condition: 'Excellent',
  },
]

export default function FindAPairSection({ onPostItem, addToast }: FindAPairSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('match')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const toggleWishlist = (id: number, title: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id)
      } else {
        addToast?.({
          type: 'info',
          title: 'Added to Wishlist',
          message: `"${title}" saved to your wishlist`,
          emoji: '❤️',
        })
        return [...prev, id]
      }
    })
  }

  const filteredItems = pairItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  return (
    <section id="listings" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🔍 Find the <span className="gradient-text">Mate</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cheaper than buying new. Someone out there has the other half of what you lost.
          </p>
        </div>

        {/* Smart Search */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Describe what you lost or what you have... AI will find matches"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-300 outline-none"
            >
              <option value="match">Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <button
              onClick={() => onPostItem('pair')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all glow-sm whitespace-nowrap"
            >
              + Post Solo Item
            </button>
          </div>

          {/* AI Suggestion */}
          {searchQuery && (
            <div className="mt-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-3">
              <span className="text-cyan-400">✨</span>
              <p className="text-sm text-cyan-300">
                <strong>AI Match:</strong> Based on your search, we found {filteredItems.length} potential matches. 
                Our smart engine analyzes brand, size, material, and style to find the best pair.
              </p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 glow-sm'
                  : 'glass-light text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Price Range Indicator */}
        <div className="flex items-center gap-4 mb-8 text-sm text-slate-500">
          <span>Price Range:</span>
          <div className="flex gap-2">
            {[0, 25, 50, 100, 200, 500].map((price) => (
              <button
                key={price}
                onClick={() => setPriceRange([0, price])}
                className={`px-3 py-1 rounded-md text-xs transition-all ${
                  priceRange[1] === price
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {price === 500 ? '$500+' : `≤$${price}`}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-light rounded-2xl overflow-hidden card-hover group"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Area */}
              <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative border-b border-cyan-500/10">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                
                {/* Match Score Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  <span className="text-xs font-bold text-cyan-400">{item.matchScore}% match</span>
                </div>

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id, item.title); }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    wishlist.includes(item.id)
                      ? 'bg-red-500/20 border border-red-500/30 scale-110'
                      : 'bg-slate-900/60 border border-slate-700/50 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <span className={`text-sm ${wishlist.includes(item.id) ? 'animate-heartbeat' : ''}`}>
                    {wishlist.includes(item.id) ? '❤️' : '🤍'}
                  </span>
                </button>

                {/* Verified Badge (positioned differently when heart exists) */}
                {item.verified && !wishlist.includes(item.id) && (
                  <div className="absolute top-12 right-3 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-green-400">✓ Verified</span>
                  </div>
                )}

                {/* Savings Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm">
                  <span className="text-xs text-slate-300">
                    Save {Math.round((1 - item.price / item.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-slate-100 leading-tight mb-1 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">{item.description}</p>

                {/* Match Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Match Confidence</span>
                    <span className="text-cyan-400 font-semibold">{item.matchScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="match-bar h-full transition-all"
                      style={{ width: `${item.matchScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-cyan-400">${item.price}</span>
                  <span className="text-sm text-slate-600 line-through">${item.originalPrice}</span>
                  <span className="text-xs text-green-400 ml-auto">{item.condition}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-[10px] font-bold text-slate-900">
                      {item.seller[0]}
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">{item.seller}</span>
                      <span className="text-xs text-slate-600 ml-2">📍 {item.location.split(',')[0]}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-colors border border-cyan-500/30">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-light rounded-2xl">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-xl text-slate-400">No items found. Try adjusting your search or filters.</p>
            <button
              onClick={() => onPostItem('pair')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Post what you're looking for
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
