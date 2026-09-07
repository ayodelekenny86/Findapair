import { useState } from 'react'

interface FreeItemNetworkProps {
  onPostItem: (type: 'pair' | 'free') => void
}

interface FreeItem {
  id: number
  title: string
  description: string
  category: string
  emoji: string
  location: string
  postedAgo: string
  giver: string
  trustScore: number
  donationOption: boolean
  urgency: 'normal' | 'high' | 'must-go'
  saves: number
}

const freeCategories = [
  { name: 'All', icon: '🎁' },
  { name: 'Furniture', icon: '🪑' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Clothing', icon: '👕' },
  { name: 'Books', icon: '📚' },
  { name: 'Kitchen', icon: '🍳' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Garden', icon: '🌱' },
]

const freeItems: FreeItem[] = [
  { id: 1, title: 'IKEA Billy Bookshelf - White', description: 'Moving out! Must go today. Good condition, minor scratches. You pick up from Brooklyn.', category: 'Furniture', emoji: '📚', location: 'Brooklyn, NY', postedAgo: '30 min ago', giver: 'Emma S.', trustScore: 98, donationOption: true, urgency: 'must-go', saves: 24 },
  { id: 2, title: 'Kids Bicycle - Pink, Ages 6-9', description: 'Daughter outgrew this. Still rides great with training wheels and bell. Free to a good home!', category: 'Toys', emoji: '🚲', location: 'Austin, TX', postedAgo: '1 hour ago', giver: 'Tom B.', trustScore: 95, donationOption: false, urgency: 'normal', saves: 12 },
  { id: 3, title: 'Box of 20+ Cookbooks', description: 'Downsizing kitchen library. Julia Child, Ina Garten, and more. All good condition.', category: 'Books', emoji: '📖', location: 'Portland, OR', postedAgo: '2 hours ago', giver: 'Lisa M.', trustScore: 92, donationOption: true, urgency: 'normal', saves: 31 },
  { id: 4, title: 'Working Panasonic Microwave', description: 'Upgraded to newer model. Works perfectly, 1000W. Just not the newest look.', category: 'Kitchen', emoji: '📦', location: 'Seattle, WA', postedAgo: '3 hours ago', giver: 'James P.', trustScore: 88, donationOption: true, urgency: 'high', saves: 8 },
  { id: 5, title: '3 Winter Coats - Women\'s M', description: 'One puffer, one wool, one rain jacket. All clean and ready to wear. Women\'s medium.', category: 'Clothing', emoji: '🧥', location: 'Denver, CO', postedAgo: '4 hours ago', giver: 'Nina K.', trustScore: 96, donationOption: true, urgency: 'normal', saves: 19 },
  { id: 6, title: 'Garden Tools Complete Set', description: 'Rake, shovel, pruning shears, trowel, gloves. Some rust but fully functional.', category: 'Garden', emoji: '🌿', location: 'Nashville, TN', postedAgo: '5 hours ago', giver: 'Robert H.', trustScore: 85, donationOption: false, urgency: 'normal', saves: 6 },
  { id: 7, title: 'iPad 2 + Charger', description: 'Still works for browsing and videos. Small screen crack but fully functional. Comes with charger.', category: 'Electronics', emoji: '📱', location: 'Phoenix, AZ', postedAgo: '6 hours ago', giver: 'Chris D.', trustScore: 91, donationOption: true, urgency: 'high', saves: 42 },
  { id: 8, title: 'Solid Wood Dining Table', description: 'Seats 4 comfortably. Some wear on top but structurally perfect. Chairs not included.', category: 'Furniture', emoji: '🪑', location: 'Philadelphia, PA', postedAgo: '8 hours ago', giver: 'Maria G.', trustScore: 94, donationOption: true, urgency: 'normal', saves: 15 },
]

export default function FreeItemNetwork({ onPostItem }: FreeItemNetworkProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = freeItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="listings" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎁 The <span className="gradient-text">FreeItem</span> Network
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            One person's trash is another person's treasure. Everything is <strong className="text-cyan-400">100% free</strong>. No money ever changes hands.
          </p>
        </div>

        {/* Rules Banner */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-green-400 font-medium">All items must be FREE</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-green-400 font-medium">Legal to own</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-green-400 font-medium">All ages appropriate</span>
          </div>
          <button
            onClick={() => onPostItem('free')}
            className="ml-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all glow-sm whitespace-nowrap"
          >
            + Give Something Free
          </button>
        </div>

        {/* Search */}
        <div className="glass rounded-2xl p-5 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search free items... e.g., 'bookshelf', 'kids bike', 'winter coat'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-xl border border-cyan-500/20 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {freeCategories.map((cat) => (
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-light rounded-2xl overflow-hidden card-hover group"
            >
              {/* Image Area */}
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative border-b border-cyan-500/10">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                
                {/* FREE Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                  <span className="text-xs font-bold text-green-400">FREE</span>
                </div>

                {/* Urgency Badge */}
                {item.urgency === 'must-go' && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <span className="text-xs text-red-400 font-semibold">🔥 Must Go</span>
                  </div>
                )}
                {item.urgency === 'high' && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-xs text-amber-400 font-semibold">⚡ Urgent</span>
                  </div>
                )}

                {/* Donation Badge */}
                {item.donationOption && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm">
                    <span className="text-xs text-emerald-400">♻️ Donation OK</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-slate-100 leading-tight mb-1 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">{item.description}</p>

                {/* Trust Score */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500">Trust:</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.round(item.trustScore / 20)
                              ? 'bg-cyan-400'
                              : 'bg-slate-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-cyan-400 font-semibold">{item.trustScore}</span>
                  </div>
                  <span className="text-xs text-slate-600 ml-auto">❤️ {item.saves} saves</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-[10px] font-bold text-slate-900">
                      {item.giver[0]}
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">{item.giver}</span>
                      <span className="text-xs text-slate-600 ml-2">📍 {item.location.split(',')[0]}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold hover:bg-green-500/30 transition-colors border border-green-500/30">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-light rounded-2xl">
            <span className="text-5xl mb-4 block">🎁</span>
            <p className="text-xl text-slate-400">No items found. Try a different category or search.</p>
          </div>
        )}

        {/* Donation CTA */}
        <div className="mt-10 glass rounded-2xl p-6 border border-emerald-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl">♻️</div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-100 mb-1">Give to a Non-Profit Instead</h3>
              <p className="text-slate-400 text-sm">
                Tag your item for donation to a local charity. Help reduce waste and landfills while helping those in need.
              </p>
            </div>
            <button
              onClick={() => onPostItem('free')}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-900 rounded-xl font-semibold hover:from-emerald-400 hover:to-emerald-300 transition-all whitespace-nowrap"
            >
              Donate an Item →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
