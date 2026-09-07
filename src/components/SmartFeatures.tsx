import { useState } from 'react'
import MatchSimulator from './MatchSimulator'

export default function SmartFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: '🧠',
      title: 'AI Match Engine',
      description: 'Our smart algorithm analyzes brand, size, material, color, and style to find the best possible match for your solo item. It learns from successful pairings to improve accuracy over time.',
      stats: ['94% match accuracy', '2.3s average search', 'Learns from 3,291+ pairings'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '💰',
      title: 'Smart Price Calculator',
      description: 'Never overpay for a mate. Our system calculates fair pricing based on original retail, condition, and market demand. Shows you exactly how much you save vs buying new.',
      stats: ['Avg 68% savings', 'Real-time market data', 'Price history tracking'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🛡️',
      title: 'Trust Score System',
      description: 'Every member has a trust score based on successful transactions, response time, item accuracy, and community feedback. Trade with confidence.',
      stats: ['5-star rating system', 'Verified badges', 'Dispute resolution'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🌍',
      title: 'Eco Impact Tracker',
      description: 'See your personal environmental impact. Every item matched or given away is tracked for CO2 saved, landfill waste prevented, and resources conserved.',
      stats: ['4.2 tons waste saved', '12 tons CO2 prevented', 'Real-time impact data'],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: '📍',
      title: 'Smart Location Matching',
      description: 'Find matches near you. Our geo-intelligent system prioritizes local matches to reduce shipping, save money, and enable easy in-person exchanges.',
      stats: ['Radius-based search', 'Meetup suggestions', 'Shipping cost estimates'],
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: '🔔',
      title: 'Instant Notifications',
      description: 'Get alerted the moment someone posts a potential match. Never miss a pairing opportunity. Smart alerts filter out low-confidence matches.',
      stats: ['Push notifications', 'Email digests', 'SMS alerts available'],
      color: 'from-rose-500 to-pink-500',
    },
  ]

  return (
    <section id="smart" className="py-16 md:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <span className="text-cyan-400">✨</span>
            <span className="text-sm text-cyan-300 font-medium">Powered by Smart Technology</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Advanced <span className="gradient-text">Smart Features</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Cutting-edge technology meets sustainable living. Our platform uses AI, machine learning, and smart algorithms to make finding your pair effortless.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => setActiveFeature(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeFeature === i
                  ? 'glass glow-sm text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {feature.icon} {feature.title}
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl mb-4">{features[activeFeature].icon}</div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">
                {features[activeFeature].title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {features[activeFeature].description}
              </p>
              <div className="space-y-2">
                {features[activeFeature].stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    <span className="text-sm text-slate-300">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className={`w-full h-64 rounded-2xl bg-gradient-to-br ${features[activeFeature].color} opacity-20`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">{features[activeFeature].icon}</div>
                  <div className="text-sm text-cyan-400 font-semibold">{features[activeFeature].stats[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((feature, i) => (
            <div
              key={i}
              onClick={() => setActiveFeature(i)}
              className={`glass-light rounded-2xl p-6 card-hover cursor-pointer ${
                activeFeature === i ? 'border-cyan-500/30 glow-sm' : ''
              }`}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-bold text-slate-100 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Match Simulator */}
        <div className="max-w-4xl mx-auto mt-12">
          <MatchSimulator />
        </div>
      </div>
    </section>
  )
}
