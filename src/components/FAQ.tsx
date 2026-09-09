import { useState } from 'react'

const faqs = [
  { question: 'How does FindAPair work?', answer: 'Simply post a photo and description of your solo item. Our AI match engine scans thousands of listings to find potential mates. When a match is found, you\'ll get notified instantly.', category: 'General' },
  { question: 'Is the FreeItem Network really free?', answer: 'Yes! 100% free. No money ever changes hands. Just list your item and someone will claim it.', category: 'FreeItem' },
  { question: 'How is the price calculated?', answer: 'We suggest pricing based on original retail, condition, and market demand. Typically 30-50% of the original pair price.', category: 'Pricing' },
  { question: 'What if I can\'t find a match?', answer: 'Our AI continuously scans new listings. On average, items find their mate within 48 hours.', category: 'Matching' },
  { question: 'How does the donation option work?', answer: 'When listing a free item, you can opt to allow non-profits to pick it up if unclaimed after 7 days.', category: 'FreeItem' },
  { question: 'What is the Trust Score?', answer: 'Every member has a trust score based on successful transactions, response time, and community feedback.', category: 'Safety' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'General', 'FreeItem', 'Pricing', 'Matching', 'Safety']
  const filteredFaqs = filter === 'All' ? faqs : faqs.filter(f => f.category === filter)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">FAQ</span>
          <h2 className="heading-lg mb-3">Frequently asked <span className="gradient-text">questions</span></h2>
          <p className="text-body">Everything you need to know about FindAPair</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${filter === cat ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`} style={filter === cat ? { background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' } : { background: 'transparent', border: '1px solid rgba(255,255,255,0.06)' }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="panel overflow-hidden" style={openIndex === i ? { borderColor: 'rgba(6,182,212,0.15)' } : {}}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                <span className="text-[14px] font-medium text-white pr-4">{faq.question}</span>
                <svg className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 animate-fade-in">
                  <p className="text-[13px] text-zinc-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
