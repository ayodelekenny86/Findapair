export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Post Your Item',
      description: 'Snap a photo, describe what you have or lost. Our AI categorizes and tags it automatically.',
      icon: '📸',
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      step: '02',
      title: 'AI Finds Matches',
      description: 'Our smart engine scans thousands of listings to find potential mates. You get notified instantly.',
      icon: '🧠',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      step: '03',
      title: 'Connect & Exchange',
      description: 'Chat with your match, agree on price (for pairs) or arrange pickup (for free items). Simple.',
      icon: '🤝',
      color: 'from-green-500/20 to-emerald-500/20',
    },
    {
      step: '04',
      title: 'Make an Impact',
      description: 'Every match prevents waste. Track your environmental contribution in real-time.',
      icon: '🌍',
      color: 'from-amber-500/20 to-orange-500/20',
    },
  ]

  return (
    <section id="how" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-dots opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From posting to pairing in minutes. Our streamlined process makes it effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
              )}
              
              <div className="glass-light rounded-2xl p-6 card-hover h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="text-xs text-cyan-500 font-bold mb-2">STEP {step.step}</div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your <span className="gradient-text">Pair</span>?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join 12,847 members who are already finding mates for their lost items and giving away unwanted stuff for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-cyan-300 transition-all glow">
                Get Started Free →
              </button>
              <button className="px-8 py-4 glass rounded-xl font-bold text-lg text-slate-200 hover:bg-slate-800/70 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
