import { useState, useEffect } from 'react'

const testimonials = [
  { id: 1, name: 'Sarah K.', avatar: '👩', role: 'Matched in 2 days', text: 'I lost my favorite gold hoop earring at a concert. Within 48 hours, someone on FindAPair had the exact match! Saved me $235.', rating: 5, itemFound: 'Gold Hoop Earring', timeSaved: '$235' },
  { id: 2, name: 'Mike R.', avatar: '👨', role: 'Matched in 1 week', text: 'My dog chewed one of my new Nikes. Found the mate on FindAPair for $45 instead of $130!', rating: 5, itemFound: 'Nike Air Max', timeSaved: '$85' },
  { id: 3, name: 'Emma T.', avatar: '👩‍🦰', role: 'Matched in 3 days', text: 'The AI match engine is incredible. I posted my pearl earring and it found an exact match from someone 2 miles away.', rating: 5, itemFound: 'Pearl Stud Earring', timeSaved: '$110' },
  { id: 4, name: 'David P.', avatar: '🧔', role: 'Matched in 5 days', text: 'I gave away my old furniture through the FreeItem Network. Someone picked it up the same day.', rating: 5, itemFound: 'FreeItem Network', timeSaved: '2 items' },
  { id: 5, name: 'Rachel G.', avatar: '👱‍♀️', role: 'Matched in 1 day', text: 'Found the matching diamond stud within 24 hours! The trust score system gave me confidence.', rating: 5, itemFound: 'Diamond Stud Earring', timeSaved: '$650' },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => setActiveIndex(prev => (prev + 1) % testimonials.length), 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Success stories</span>
          <h2 className="heading-lg mb-3">Real people, real <span className="gradient-text">matches</span></h2>
          <p className="text-body max-w-xl mx-auto">See how our community is reuniting lost items and reducing waste.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="panel p-8 md:p-10 relative" key={activeIndex}>
            <div className="absolute top-4 left-6 text-5xl text-cyan-500/10 font-serif">"</div>
            <div className="relative animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white">{testimonials[activeIndex].name}</h4>
                  <p className="text-[12px] text-cyan-400">{testimonials[activeIndex].role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[15px] text-zinc-300 leading-relaxed mb-6 italic">"{testimonials[activeIndex].text}"</p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-accent">🔍 Found: {testimonials[activeIndex].itemFound}</span>
                <span className="badge badge-success">💰 Saved: {testimonials[activeIndex].timeSaved}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); }} className="transition-all rounded-full" style={{ width: i === activeIndex ? '24px' : '6px', height: '6px', background: i === activeIndex ? '#06b6d4' : 'rgba(255,255,255,0.1)' }}></button>
          ))}
          <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="ml-3 text-[11px] text-zinc-600 hover:text-zinc-400">
            {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
        </div>
      </div>
    </section>
  )
}
