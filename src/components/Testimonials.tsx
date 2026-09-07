import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  avatar: string
  role: string
  text: string
  rating: number
  itemFound: string
  timeSaved: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah K.',
    avatar: '👩',
    role: 'Matched in 2 days',
    text: 'I lost my favorite gold hoop earring at a concert. Within 48 hours, someone on FindAPair had the exact match! Saved me $235.',
    rating: 5,
    itemFound: 'Gold Hoop Earring',
    timeSaved: '$235',
  },
  {
    id: 2,
    name: 'Mike R.',
    avatar: '👨',
    role: 'Matched in 1 week',
    text: 'My dog chewed one of my new Nikes. I thought I\'d have to throw them out. Found the mate on FindAPair for $45 instead of $130!',
    rating: 5,
    itemFound: 'Nike Air Max',
    timeSaved: '$85',
  },
  {
    id: 3,
    name: 'Emma T.',
    avatar: '👩‍🦰',
    role: 'Matched in 3 days',
    text: 'The AI match engine is incredible. I posted my pearl earring and it found an exact match from someone 2 miles away. Magic!',
    rating: 5,
    itemFound: 'Pearl Stud Earring',
    timeSaved: '$110',
  },
  {
    id: 4,
    name: 'David P.',
    avatar: '🧔',
    role: 'Matched in 5 days',
    text: 'I gave away my old furniture through the FreeItem Network. Someone picked it up the same day. So much better than the dump!',
    rating: 5,
    itemFound: 'FreeItem Network',
    timeSaved: '2 items',
  },
  {
    id: 5,
    name: 'Rachel G.',
    avatar: '👱‍♀️',
    role: 'Matched in 1 day',
    text: 'Found the matching diamond stud within 24 hours! The trust score system gave me confidence to meet the seller. Amazing platform.',
    rating: 5,
    itemFound: 'Diamond Stud Earring',
    timeSaved: '$650',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real people, real matches. See how our community is reuniting lost items and reducing waste.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Quote mark */}
            <div className="absolute top-4 left-6 text-6xl text-cyan-500/10 font-serif">"</div>
            
            <div className="relative" key={activeIndex}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-300/20 border border-cyan-500/30 flex items-center justify-center text-2xl">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-cyan-400">{testimonials[activeIndex].role}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed mb-6 italic">
                "{testimonials[activeIndex].text}"
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400">
                  🔍 Found: {testimonials[activeIndex].itemFound}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                  💰 Saved: {testimonials[activeIndex].timeSaved}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); }}
              className={`transition-all rounded-full ${
                i === activeIndex
                  ? 'w-8 h-2 bg-cyan-500'
                  : 'w-2 h-2 bg-slate-700 hover:bg-slate-600'
              }`}
            ></button>
          ))}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="ml-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
        </div>

        {/* Mini Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); }}
              className={`glass-light rounded-xl p-3 text-left transition-all ${
                i === activeIndex ? 'border-cyan-500/30 glow-sm' : 'hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{t.avatar}</span>
                <span className="text-xs font-semibold text-slate-300 truncate">{t.name}</span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-2">{t.text}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
