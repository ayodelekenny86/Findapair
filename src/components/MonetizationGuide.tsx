import { useState } from 'react'

export default function MonetizationGuide() {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategies' | 'implementation' | 'projections'>('overview')

  const revenueStreams = [
    {
      name: 'Premium Subscriptions',
      icon: '💎',
      description: 'Monthly/Annual subscription plans with tiered features',
      potential: '$5,000 - $50,000/month',
      difficulty: 'Medium',
      timeline: '1-2 months',
      details: [
        'Free tier: Basic features, limited posts',
        'Pro tier ($9.99/mo): Unlimited posts, AI matching, analytics',
        'Business tier ($29.99/mo): API access, white-label, team features',
        'Target: 5-10% conversion rate from free to paid',
      ],
    },
    {
      name: 'Featured Listings',
      icon: '⭐',
      description: 'Pay to boost item visibility in search results',
      potential: '$2,000 - $20,000/month',
      difficulty: 'Easy',
      timeline: '2-4 weeks',
      details: [
        '$2.99 per featured listing (7 days)',
        'Top placement in search results',
        'Highlighted with special badge',
        'Expected: 10-20% of users feature items',
      ],
    },
    {
      name: 'Trust Verification',
      icon: '✓',
      description: 'Paid verification badges to build trust',
      potential: '$1,000 - $10,000/month',
      difficulty: 'Easy',
      timeline: '2-4 weeks',
      details: [
        '$4.99/month for verified badge',
        'Identity verification process',
        'Increases trust and match rates',
        'Expected: 15-25% of active users verify',
      ],
    },
    {
      name: 'Display Advertising',
      icon: '📢',
      description: 'Strategic ad placements throughout the site',
      potential: '$1,000 - $15,000/month',
      difficulty: 'Easy',
      timeline: '1-2 weeks',
      details: [
        'Google AdSense integration',
        'Strategic banner placements',
        'Native advertising options',
        'Expected RPM: $2-5 per 1000 pageviews',
      ],
    },
    {
      name: 'Affiliate Marketing',
      icon: '🔗',
      description: 'Earn commissions from partner referrals',
      potential: '$500 - $5,000/month',
      difficulty: 'Easy',
      timeline: '2-4 weeks',
      details: [
        'Partner with item insurance companies',
        'Shipping service referrals',
        'Authentication services',
        'Commission: 5-15% per referral',
      ],
    },
    {
      name: 'Transaction Fees',
      icon: '💰',
      description: 'Small fee on successful matches',
      potential: '$3,000 - $30,000/month',
      difficulty: 'Medium',
      timeline: '2-3 months',
      details: [
        '2-5% fee on successful transactions',
        'Optional payment processing',
        'Escrow service for high-value items',
        'Expected: 30-50% of matches use payment',
      ],
    },
    {
      name: 'API Access',
      icon: '🔌',
      description: 'Developer API subscriptions',
      potential: '$2,000 - $20,000/month',
      difficulty: 'Hard',
      timeline: '3-4 months',
      details: [
        '$49-199/month for API access',
        'Rate-limited endpoints',
        'Webhook support',
        'Expected: 50-200 developer subscribers',
      ],
    },
    {
      name: 'Sponsored Content',
      icon: '📝',
      description: 'Brand partnerships and sponsored listings',
      potential: '$1,000 - $10,000/month',
      difficulty: 'Medium',
      timeline: '2-3 months',
      details: [
        'Sponsored item placements',
        'Brand partnership campaigns',
        'Newsletter sponsorships',
        'Expected: 2-5 sponsors per month',
      ],
    },
  ]

  const totalPotential = {
    low: revenueStreams.reduce((sum, stream) => {
      const match = stream.potential.match(/\$(\d+),\d+ - \$(\d+),\d+/)
      return sum + (match ? parseInt(match[1]) * 1000 : 0)
    }, 0),
    high: revenueStreams.reduce((sum, stream) => {
      const match = stream.potential.match(/\$(\d+),\d+ - \$(\d+),\d+/)
      return sum + (match ? parseInt(match[2]) * 1000 : 0)
    }, 0),
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Revenue Strategy</span>
          <h2 className="heading-lg mb-3">
            Monetization <span className="gradient-text">Guide</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Complete breakdown of how to generate revenue from FindAPair
          </p>
        </div>

        {/* Revenue Summary */}
        <div className="panel p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">
                ${(totalPotential.low / 1000).toFixed(0)}k - ${(totalPotential.high / 1000).toFixed(0)}k
              </div>
              <div className="text-[13px] text-zinc-500">Monthly Revenue Potential</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{revenueStreams.length}</div>
              <div className="text-[13px] text-zinc-500">Revenue Streams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">60-80%</div>
              <div className="text-[13px] text-zinc-500">Profit Margin</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {(['overview', 'strategies', 'implementation', 'projections'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-md text-[13px] font-medium transition-all capitalize ${
                activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={activeTab === tab ? { background: 'rgba(255,255,255,0.08)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="panel p-6">
              <h3 className="heading-md mb-4">Quick Start Strategy</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <div>
                    <p className="text-[14px] text-white font-medium">Start with Display Ads (Week 1)</p>
                    <p className="text-[12px] text-zinc-500">Integrate Google AdSense immediately for instant revenue</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <div>
                    <p className="text-[14px] text-white font-medium">Add Featured Listings (Week 2-3)</p>
                    <p className="text-[12px] text-zinc-500">Low effort, high impact revenue stream</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <div>
                    <p className="text-[14px] text-white font-medium">Launch Subscriptions (Month 2)</p>
                    <p className="text-[12px] text-zinc-500">Build premium features and pricing tiers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">4.</span>
                  <div>
                    <p className="text-[14px] text-white font-medium">Scale with Transaction Fees (Month 3+)</p>
                    <p className="text-[12px] text-zinc-500">Add payment processing for high-value items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="grid md:grid-cols-2 gap-4">
            {revenueStreams.map((stream, i) => (
              <div key={i} className="panel p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{stream.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-semibold text-white mb-1">{stream.name}</h4>
                    <p className="text-[12px] text-zinc-500">{stream.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-zinc-500">Potential:</span>
                    <span className="text-emerald-400 font-semibold">{stream.potential}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-zinc-500">Difficulty:</span>
                    <span className={`font-semibold ${
                      stream.difficulty === 'Easy' ? 'text-emerald-400' :
                      stream.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'
                    }`}>{stream.difficulty}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-zinc-500">Timeline:</span>
                    <span className="text-zinc-300">{stream.timeline}</span>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="text-[12px] text-cyan-400 cursor-pointer hover:text-cyan-300">
                    View details
                  </summary>
                  <ul className="mt-2 space-y-1">
                    {stream.details.map((detail, j) => (
                      <li key={j} className="text-[11px] text-zinc-500 flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-4">
            <div className="panel p-6">
              <h3 className="heading-md mb-4">Implementation Checklist</h3>
              <div className="space-y-3">
                {[
                  { task: 'Set up Google AdSense account', done: false, priority: 'High' },
                  { task: 'Create pricing page with subscription tiers', done: true, priority: 'High' },
                  { task: 'Integrate Stripe for payments', done: false, priority: 'High' },
                  { task: 'Build featured listings system', done: false, priority: 'Medium' },
                  { task: 'Implement trust verification process', done: false, priority: 'Medium' },
                  { task: 'Set up affiliate partnerships', done: false, priority: 'Low' },
                  { task: 'Create API documentation', done: false, priority: 'Low' },
                  { task: 'Build analytics dashboard', done: true, priority: 'Medium' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <input 
                      type="checkbox" 
                      checked={item.done}
                      onChange={() => {}}
                      className="w-4 h-4 accent-cyan-500"
                    />
                    <span className={`flex-1 text-[13px] ${item.done ? 'text-zinc-500 line-through' : 'text-white'}`}>
                      {item.task}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded ${
                      item.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                      item.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <h3 className="heading-md mb-4">Recommended Tech Stack</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">Payments</h4>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Stripe (primary)</li>
                    <li className="text-[12px] text-zinc-500">• PayPal (alternative)</li>
                    <li className="text-[12px] text-zinc-500">• Crypto (optional)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">Advertising</h4>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Google AdSense</li>
                    <li className="text-[12px] text-zinc-500">• Carbon Ads (premium)</li>
                    <li className="text-[12px] text-zinc-500">• Media.net (alternative)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">Analytics</h4>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Google Analytics</li>
                    <li className="text-[12px] text-zinc-500">• Mixpanel (events)</li>
                    <li className="text-[12px] text-zinc-500">• Stripe Dashboard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">Infrastructure</h4>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Vercel/Netlify (hosting)</li>
                    <li className="text-[12px] text-zinc-500">• Supabase/Firebase (backend)</li>
                    <li className="text-[12px] text-zinc-500">• Cloudflare (CDN)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projections' && (
          <div className="space-y-4">
            <div className="panel p-6">
              <h3 className="heading-md mb-4">12-Month Revenue Projection</h3>
              <div className="space-y-3">
                {[
                  { month: 'Month 1-3', revenue: '$500 - $2,000', focus: 'Ads + Featured Listings', users: '1,000 - 5,000' },
                  { month: 'Month 4-6', revenue: '$2,000 - $8,000', focus: '+ Subscriptions', users: '5,000 - 15,000' },
                  { month: 'Month 7-9', revenue: '$8,000 - $25,000', focus: '+ Transaction Fees', users: '15,000 - 40,000' },
                  { month: 'Month 10-12', revenue: '$25,000 - $75,000', focus: '+ API + Sponsorships', users: '40,000 - 100,000' },
                ].map((proj, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[14px] font-semibold text-white">{proj.month}</p>
                        <p className="text-[12px] text-zinc-500">{proj.focus}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-bold text-emerald-400">{proj.revenue}</p>
                        <p className="text-[11px] text-zinc-500">{proj.users} users</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <h3 className="heading-md mb-4">Key Success Metrics</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[13px] text-zinc-400 mb-2">Conversion Rates</p>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Free to Pro: 5-10%</li>
                    <li className="text-[12px] text-zinc-500">• Feature listings: 10-20%</li>
                    <li className="text-[12px] text-zinc-500">• Verification: 15-25%</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[13px] text-zinc-400 mb-2">Revenue Per User</p>
                  <ul className="space-y-1">
                    <li className="text-[12px] text-zinc-500">• Free users: $0.10-0.50/mo</li>
                    <li className="text-[12px] text-zinc-500">• Pro users: $9.99/mo</li>
                    <li className="text-[12px] text-zinc-500">• Business users: $29.99/mo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <a href="#pricing" className="btn-primary inline-flex">
            View Pricing Plans →
          </a>
        </div>
      </div>
    </section>
  )
}
