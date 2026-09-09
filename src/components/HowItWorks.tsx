export default function HowItWorks() {
  const steps = [
    { step: '01', title: 'Post your item', description: 'Snap a photo, describe what you have or lost. Our AI categorizes and tags it automatically.', icon: '📸' },
    { step: '02', title: 'AI finds matches', description: 'Our smart engine scans thousands of listings to find potential mates. You get notified instantly.', icon: '🧠' },
    { step: '03', title: 'Connect & exchange', description: 'Chat with your match, agree on price or arrange pickup. Simple and secure.', icon: '🤝' },
    { step: '04', title: 'Make an impact', description: 'Every match prevents waste. Track your environmental contribution in real-time.', icon: '🌍' },
  ]

  return (
    <section id="how" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">How it works</span>
          <h2 className="heading-lg mb-3">
            From posting to <span className="gradient-text">pairing</span>
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Our streamlined process makes it effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="card relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold text-cyan-400 tracking-wider">STEP {step.step}</span>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.3), transparent)' }}></div>
                )}
              </div>
              <div className="text-2xl mb-3">{step.icon}</div>
              <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="panel p-8 md:p-12 max-w-3xl mx-auto panel-glow">
            <h3 className="heading-md mb-3">
              Ready to find your <span className="gradient-text">pair</span>?
            </h3>
            <p className="text-body mb-8 max-w-xl mx-auto">
              Join 12,847 members who are already finding mates for their lost items.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary !py-3.5 !px-7">
                Get started free →
              </button>
              <button className="btn-secondary !py-3.5 !px-7">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
