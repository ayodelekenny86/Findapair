import { useState } from 'react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Post up to 5 items',
        'Basic matching',
        'Standard support',
        'Community access',
        'Basic analytics',
      ],
      limitations: [
        'No featured listings',
        'No priority matching',
        'Limited analytics',
      ],
      cta: 'Current Plan',
      popular: false,
      color: 'zinc',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'For serious matchers',
      features: [
        'Unlimited item posts',
        'AI-powered matching',
        'Priority support',
        'Advanced analytics',
        '3 featured listings/month',
        'Verified badge',
        'Price predictions',
        'Email notifications',
      ],
      limitations: [],
      cta: 'Upgrade to Pro',
      popular: true,
      color: 'cyan',
    },
    {
      id: 'business',
      name: 'Business',
      price: { monthly: 29.99, yearly: 299.99 },
      description: 'For power users & businesses',
      features: [
        'Everything in Pro',
        'Unlimited featured listings',
        'API access',
        'Custom analytics',
        'Priority matching',
        'Dedicated account manager',
        'White-label options',
        'Bulk posting tools',
        'Advanced reporting',
        'Team collaboration',
      ],
      limitations: [],
      cta: 'Go Business',
      popular: false,
      color: 'purple',
    },
  ]

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowCheckout(true)
  }

  const yearlySavings = (monthlyPrice: number) => {
    return ((monthlyPrice * 12 - monthlyPrice * 10) / (monthlyPrice * 12) * 100).toFixed(0)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Pricing</span>
          <h2 className="heading-lg mb-3">
            Choose your <span className="gradient-text">plan</span>
          </h2>
          <p className="text-body max-w-xl mx-auto mb-8">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'
              }`}
              style={billingCycle === 'monthly' ? { background: 'rgba(255,255,255,0.08)' } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                billingCycle === 'yearly' ? 'text-white' : 'text-zinc-500'
              }`}
              style={billingCycle === 'yearly' ? { background: 'rgba(255,255,255,0.08)' } : {}}
            >
              Yearly <span className="text-emerald-400 text-[11px] ml-1">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`panel p-6 relative ${plan.popular ? 'border-cyan-500/30 panel-glow' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)', color: '#09090b' }}>
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-[13px] text-zinc-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price.monthly : (plan.price.yearly / 12).toFixed(2)}
                  </span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-[12px] text-emerald-400 mt-1">
                    ${plan.price.yearly}/year (Save {yearlySavings(plan.price.monthly)}%)
                  </p>
                )}
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full mb-6 ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                disabled={plan.id === 'free'}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[13px] text-zinc-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start gap-2 opacity-50">
                    <svg className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[13px] text-zinc-500">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Revenue Streams */}
        <div className="panel p-8">
          <h3 className="heading-md mb-6 text-center">Other Ways to Support FindAPair</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Featured Listings */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-2xl mb-2">⭐</div>
              <h4 className="text-[14px] font-semibold text-white mb-1">Featured Listings</h4>
              <p className="text-[12px] text-zinc-500 mb-2">Boost your item visibility</p>
              <p className="text-[16px] font-bold text-cyan-400">$2.99<span className="text-[11px] text-zinc-500">/listing</span></p>
            </div>

            {/* Trust Verification */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-2xl mb-2">✓</div>
              <h4 className="text-[14px] font-semibold text-white mb-1">Verified Badge</h4>
              <p className="text-[12px] text-zinc-500 mb-2">Build trust with buyers</p>
              <p className="text-[16px] font-bold text-cyan-400">$4.99<span className="text-[11px] text-zinc-500">/month</span></p>
            </div>

            {/* Priority Matching */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="text-[14px] font-semibold text-white mb-1">Priority Matching</h4>
              <p className="text-[12px] text-zinc-500 mb-2">Get matched faster</p>
              <p className="text-[16px] font-bold text-cyan-400">$1.99<span className="text-[11px] text-zinc-500">/match</span></p>
            </div>

            {/* Donation */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-2xl mb-2">❤️</div>
              <h4 className="text-[14px] font-semibold text-white mb-1">Support Us</h4>
              <p className="text-[12px] text-zinc-500 mb-2">Keep FindAPair free</p>
              <button className="text-[14px] font-bold text-emerald-400 hover:text-emerald-300">
                Donate →
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center">
          <p className="text-[13px] text-zinc-500 mb-2">Have questions?</p>
          <a href="#faq" className="text-[13px] text-cyan-400 hover:text-cyan-300 font-medium">
            Check our FAQ →
          </a>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="panel-elevated max-w-md w-full p-8 animate-scale-in">
            <h3 className="heading-md mb-4">Upgrade to {plans.find(p => p.id === selectedPlan)?.name}</h3>
            <p className="text-body mb-6">
              You're about to subscribe to the {selectedPlan} plan at ${billingCycle === 'monthly' ? plans.find(p => p.id === selectedPlan)?.price.monthly : (plans.find(p => p.id === selectedPlan)?.price.yearly! / 12).toFixed(2)}/month.
            </p>
            
            <div className="space-y-4 mb-6">
              <input type="email" placeholder="Email address" className="input-field" />
              <input type="text" placeholder="Card number" className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="input-field" />
                <input type="text" placeholder="CVC" className="input-field" />
              </div>
            </div>

            <button className="btn-primary w-full mb-3">
              Subscribe Now
            </button>
            <button onClick={() => setShowCheckout(false)} className="btn-secondary w-full">
              Cancel
            </button>

            <p className="text-[11px] text-zinc-600 text-center mt-4">
              Secure payment powered by Stripe. Cancel anytime.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
