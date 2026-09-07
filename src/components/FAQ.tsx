import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    question: 'How does FindAPair work?',
    answer: 'Simply post a photo and description of your solo item. Our AI match engine scans thousands of listings to find potential mates. When a match is found, you\'ll get notified instantly and can connect with the other person.',
    category: 'General',
  },
  {
    question: 'Is the FreeItem Network really free?',
    answer: 'Yes! 100% free. No money ever changes hands. Our FreeItem Network is built on the principle that one person\'s trash is another\'s treasure. Just list your item and someone will claim it.',
    category: 'FreeItem',
  },
  {
    question: 'How is the price calculated for solo items?',
    answer: 'We suggest pricing based on the original retail price, condition, and market demand. Typically, solo items are priced at 30-50% of the original pair price, giving buyers significant savings while ensuring sellers get fair value.',
    category: 'Pricing',
  },
  {
    question: 'What if I can\'t find a match?',
    answer: 'Our AI continuously scans new listings. You can also set up alerts to be notified when someone posts a potential match. On average, items find their mate within 48 hours.',
    category: 'Matching',
  },
  {
    question: 'How does the donation option work?',
    answer: 'When listing a free item, you can opt to allow non-profit organizations to pick it up if it remains unclaimed after 7 days. This ensures nothing goes to waste and helps those in need.',
    category: 'FreeItem',
  },
  {
    question: 'What is the Trust Score?',
    answer: 'Every member has a trust score based on successful transactions, response time, item accuracy, and community feedback. Higher scores mean more reliable members. You can see trust scores on every listing.',
    category: 'Safety',
  },
  {
    question: 'Can I sell items that aren\'t pairs?',
    answer: 'FindAPair is specifically designed for items that come in pairs or sets. For general items, use our FreeItem Network to give them away, or check out our partner marketplace for selling other goods.',
    category: 'General',
  },
  {
    question: 'How do you prevent fraud?',
    answer: 'We use multiple layers of protection: verified badges, trust scores, community reporting, and our dispute resolution team. All transactions are tracked and we have a zero-tolerance policy for fraud.',
    category: 'Safety',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'General', 'FreeItem', 'Pricing', 'Matching', 'Safety']

  const filteredFaqs = filter === 'All' ? faqs : faqs.filter(f => f.category === filter)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400">Everything you need to know about FindAPair</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'glass-light text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-light rounded-xl overflow-hidden transition-all ${
                openIndex === i ? 'border-cyan-500/30 glow-sm' : ''
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    faq.category === 'General' ? 'bg-slate-700 text-slate-300' :
                    faq.category === 'FreeItem' ? 'bg-green-500/20 text-green-400' :
                    faq.category === 'Pricing' ? 'bg-amber-500/20 text-amber-400' :
                    faq.category === 'Matching' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {faq.category}
                  </span>
                  <span className="font-semibold text-slate-200 text-sm md:text-base">{faq.question}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-4 animate-slide-up" style={{ animationDuration: '0.3s' }}>
                  <p className="text-sm text-slate-400 leading-relaxed pl-[4.5rem]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center glass rounded-2xl p-6">
          <p className="text-slate-400 mb-3">Still have questions?</p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all">
            Contact Support →
          </button>
        </div>
      </div>
    </section>
  )
}
