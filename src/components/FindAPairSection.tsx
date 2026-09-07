import { useState } from 'react'

interface FindAPairSectionProps {
  onPostItem: (type: 'pair' | 'free') => void
}

interface PairListing {
  id: number
  title: string
  description: string
  category: string
  price: string
  originalPrice: string
  image: string
  location: string
  postedAgo: string
  seller: string
  condition: string
}

const categories = [
  { name: 'All', icon: '🔍' },
  { name: 'Earrings', icon: '💎' },
  { name: 'Shoes', icon: '👠' },
  { name: 'Gloves', icon: '🧤' },
  { name: 'Glasses', icon: '👓' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Buttons', icon: '🔘' },
  { name: 'Other', icon: '📦' },
]

const listings: PairListing[] = [
  {
    id: 1,
    title: 'Left Gold Hoop Earring',
    description: 'Beautiful 14k gold hoop earring, lost the right one. About 2cm diameter. Selling as-is for someone who needs a left earring or wants to melt it down.',
    category: 'Earrings',
    price: '$45',
    originalPrice: '$180 (pair)',
    image: '💎',
    location: 'New York, NY',
    postedAgo: '2 hours ago',
    seller: 'Sarah M.',
    condition: 'Excellent',
  },
  {
    id: 2,
    title: 'Nike Air Max - Right Shoe Only',
    description: 'Brand new Nike Air Max 90, size 10. Only have the right shoe. Box and tags included. Perfect for someone who lost their right shoe.',
    category: 'Shoes',
    price: '$35',
    originalPrice: '$120 (pair)',
    image: '👟',
    location: 'Los Angeles, CA',
    postedAgo: '5 hours ago',
    seller: 'Mike T.',
    condition: 'New',
  },
  {
    id: 3,
    title: 'Pearl Stud Earring - Right',
    description: 'Genuine freshwater pearl stud, right ear. 8mm pearl on sterling silver post. Lost my left one at a concert.',
    category: 'Earrings',
    price: '$25',
    originalPrice: '$85 (pair)',
    image: '✨',
    location: 'Chicago, IL',
    postedAgo: '1 day ago',
    seller: 'Jessica L.',
    condition: 'Good',
  },
  {
    id: 4,
    title: 'Leather Driving Glove - Left',
    description: 'Premium Italian leather driving glove, left hand, size M. Beautiful cognac color. Lost the right one.',
    category: 'Gloves',
    price: '$20',
    originalPrice: '$75 (pair)',
    image: '🧤',
    location: 'Boston, MA',
    postedAgo: '1 day ago',
    seller: 'David R.',
    condition: 'Like New',
  },
  {
    id: 5,
    title: 'Ray-Ban Sunglasses - Left Lens Frame',
    description: 'Ray-Ban Aviator frame with left lens intact. Right side bent in accident. Frame is salvageable for parts or repair.',
    category: 'Glasses',
    price: '$30',
    originalPrice: '$160',
    image: '🕶️',
    location: 'Miami, FL',
    postedAgo: '2 days ago',
    seller: 'Alex K.',
    condition: 'Fair',
  },
  {
    id: 6,
    title: 'Diamond Tennis Bracelet - Broken Half',
    description: 'Beautiful diamond tennis bracelet that broke. Have approximately half of it with 15 stones. 14k white gold.',
    category: 'Other',
    price: '$280',
    originalPrice: '$1,200 (full)',
    image: '💍',
    location: 'San Francisco, CA',
    postedAgo: '3 days ago',
    seller: 'Rachel W.',
    condition: 'Good',
  },
]

export default function FindAPairSection({ onPostItem }: FindAPairSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="listings" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔍 Find a Pair
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Someone out there has the mate to your lost item. It's cheaper than buying new, and saves something from the landfill.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a lost item... e.g., 'left earring', 'single shoe size 9'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-lg transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Post CTA */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 mb-10 text-center">
          <p className="text-lg text-gray-700 mb-3">
            Have a solo item you can't find the mate for? Someone else might need it!
          </p>
          <button
            onClick={() => onPostItem('pair')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-md"
          >
            + Post Your Solo Item
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                <span className="text-7xl group-hover:scale-110 transition-transform">{listing.image}</span>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-purple-700">
                  {listing.condition}
                </span>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-purple-600">{listing.price}</span>
                  <span className="text-sm text-gray-400 line-through">{listing.originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Save 70%+</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📍 {listing.location}</span>
                  <span>{listing.postedAgo}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-600">by {listing.seller}</span>
                  <button className="text-purple-600 font-semibold text-sm hover:text-purple-700">
                    Contact →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-xl text-gray-500">No items found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
