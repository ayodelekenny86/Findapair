import { useState } from 'react'
import MatchSimulator from './MatchSimulator'

export default function SmartFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { icon: '🧠', title: 'AI Match Engine', description: 'Our smart algorithm analyzes brand, size, material, color, and style to find the best possible match. It learns from successful pairings to improve accuracy over time.', stats: ['94% match accuracy', '2.3s average search', 'Learns from 3,291+ pairings'] },
    { icon: '💰', title: 'Smart Price Calculator', description: 'Never overpay for a mate. Our system calculates fair pricing based on original retail, condition, and market demand.', stats: ['Avg 68% savings', 'Real-time market data', 'Price history tracking'] },
    { icon: '🛡️', title: 'Trust Score System', description: 'Every member has a trust score based on successful transactions, response time, and community feedback.', stats: ['5-star rating system', 'Verified badges', 'Dispute resolution'] },
    { icon: '🌍', title: 'Eco Impact Tracker', description: 'See your personal environmental impact. Every item matched or given away is tracked for CO2 saved.', stats: ['4.2 tons waste saved', '12 tons CO2 prevented', 'Real-time impact data'] },
    { icon: '📍', title: 'Smart Location Matching', description: 'Find matches near you. Our geo-intelligent system prioritizes local matches to reduce shipping.', stats: ['Radius-based search', 'Meetup suggestions', 'Shipping cost estimates'] },
    { icon: '🔔', title: 'Instant Notifications', description: 'Get alerted the moment someone posts a potential match. Never miss a pairing opportunity.', stats: ['Push notifications', 'Email digests', 'SMS alerts available'] },
  ]

  return (
    <section id="smart" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Smart technology</span>
          <h2 className="heading-lg mb-3">
            Advanced <span className="gradient-text">features</span>
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Cutting-edge technology meets sustainable living. Our platform uses AI and machine learning.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => setActiveFeature(i)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeFeature === i
                  ? 'text-cyan-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={activeFeature === i ? {
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              } : {
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {feature.icon} {feature.title}
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="panel p-8 md:p-12 max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-4xl mb-4">{features[activeFeature].icon}</div>
              <h3 className="heading-md mb-3">{features[activeFeature].title}</h3>
              <p className="text-body mb-6">{features[activeFeature].description}</p>
              <div className="space-y-2">
                {features[activeFeature].stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                    <span className="text-[13px] text-zinc-400">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-48 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05))' }}>
              <div className="panel-elevated p-6 text-center">
                <div className="text-3xl mb-2">{features[activeFeature].icon}</div>
                <div className="text-[13px] text-cyan-400 font-semibold">{features[activeFeature].stats[0]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              onClick={() => setActiveFeature(i)}
              className={`card card-interactive cursor-pointer ${activeFeature === i ? 'border-cyan-500/20' : ''}`}
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h4 className="text-[14px] font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-[12px] text-zinc-500 line-clamp-2">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Match Simulator */}
        <div className="max-w-4xl mx-auto mt-12">
          <MatchSimulator />
        </div>
      </div>
    </section>
  )
}
