import { useState } from 'react'

interface FreeItemNetworkProps {
  onPostItem: (type: 'pair' | 'free') => void
}

interface FreeItem {
  id: number
  title: string
  description: string
  category: string
  image: string
  location: string
  postedAgo: string
  giver: string
  claimed: boolean
  donationOption: boolean
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
  { name: 'Other', icon: '📦' },
]

const freeItems: FreeItem[] = [
  {
    id: 1,
    title: 'IKEA Bookshelf - Must Go Today',
    description: 'Moving out and can\'t take my Billy bookshelf. White, good condition, some minor scratches. You pick up.',
    category: 'Furniture',
    image: '📚',
    location: 'Brooklyn, NY',
    postedAgo: '30 min ago',
    giver: 'Emma S.',
    claimed: false,
    donationOption: true,
  },
  {
    id: 2,
    title: 'Kids Bicycle - Ages 6-9',
    description: 'My daughter outgrew this pink bicycle. Still rides great, includes training wheels and bell. Free to a good home!',
    category: 'Toys',
    image: '🚲',
    location: 'Austin, TX',
    postedAgo: '1 hour ago',
    giver: 'Tom B.',
    claimed: false,
    donationOption: false,
  },
  {
    id: 3,
    title: 'Box of Cookbooks (20+)',
    description: 'Downsizing my kitchen library. Over 20 cookbooks including Julia Child, Ina Garten, and more. All in good condition.',
    category: 'Books',
    image: '📖',
    location: 'Portland, OR',
    postedAgo: '2 hours ago',
    giver: 'Lisa M.',
    claimed: false,
    donationOption: true,
  },
  {
    id: 4,
    title: 'Working Microwave',
    description: 'Upgraded to a newer model. This Panasonic microwave works perfectly, just not the newest look. 1000W.',
    category: 'Kitchen',
    image: '📦',
    location: 'Seattle, WA',
    postedAgo: '3 hours ago',
    giver: 'James P.',
    claimed: false,
    donationOption: true,
  },
  {
    id: 5,
    title: 'Winter Coat Collection - Women\'s M',
    description: 'Three winter coats, women\'s medium. One puffer, one wool, one rain jacket. All clean and ready to wear.',
    category: 'Clothing',
    image: '🧥',
    location: 'Denver, CO',
    postedAgo: '4 hours ago',
    giver: 'Nina K.',
    claimed: false,
    donationOption: true,
  },
  {
    id: 6,
    title: 'Garden Tools Set',
    description: 'Rake, shovel, pruning shears, trowel, and gloves. Some rust but all functional. Great for someone starting a garden.',
    category: 'Garden',
    image: '🌿',
    location: 'Nashville, TN',
    postedAgo: '5 hours ago',
    giver: 'Robert H.',
    claimed: false,
    donationOption: false,
  },
  {
    id: 7,
    title: 'Old iPad 2 + Charger',
    description: 'Still works fine for browsing and videos. Screen has a small crack in corner but fully functional. Comes with charger.',
    category: 'Electronics',
    image: '📱',
    location: 'Phoenix, AZ',
    postedAgo: '6 hours ago',
    giver: 'Chris D.',
    claimed: false,
    donationOption: true,
  },
  {
    id: 8,
    title: 'Dining Table - Seats 4',
    description: 'Solid wood dining table, seats 4 comfortably. Some wear on top but structurally perfect. Chairs not included.',
    category: 'Furniture',
    image: '🪑',
    location: 'Philadelphia, PA',
    postedAgo: '8 hours ago',
    giver: 'Maria G.',
    claimed: false,
    donationOption: true,
  },
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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎁 The FreeItem Network
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            One person's trash is another person's treasure. Everything posted is <strong>100% free</strong>. No money ever changes hands.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>✅</span>
            <span>Rule: Everything must be free, legal, and appropriate for all ages</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search free items... e.g., 'bookshelf', 'kids bike', 'winter coat'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none text-lg transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {freeCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:text-green-600'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Donation CTA */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 mb-10 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-4xl">♻️</div>
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-800">
                Don't need it? Give it to a non-profit!
              </p>
              <p className="text-sm text-gray-600">
                Help reduce waste and landfills. Tag your item for donation to a local charity.
              </p>
            </div>
            <button
              onClick={() => onPostItem('free')}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md whitespace-nowrap"
            >
              + Give Something Free
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative">
                <span className="text-6xl group-hover:scale-110 transition-transform">{item.image}</span>
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FREE
                </span>
                {item.donationOption && (
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-green-700">
                    ♻️ Donation OK
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>📍 {item.location}</span>
                  <span>{item.postedAgo}</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-600">from {item.giver}</span>
                  <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🎁</span>
            <p className="text-xl text-gray-500">No items found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
