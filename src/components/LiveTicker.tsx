import { useState, useEffect } from 'react'

interface MatchEvent {
  id: number
  user: string
  item: string
  emoji: string
  savings: string
}

const matchEvents: MatchEvent[] = [
  { id: 1, user: 'Sarah K.', item: 'Gold Hoop Earring', emoji: '💎', savings: '$235' },
  { id: 2, user: 'Mike R.', item: 'Nike Air Max', emoji: '👟', savings: '$85' },
  { id: 3, user: 'Emma T.', item: 'Pearl Stud', emoji: '🦪', savings: '$110' },
  { id: 4, user: 'David P.', item: 'Ray-Ban Lens', emoji: '👓', savings: '$133' },
  { id: 5, user: 'Rachel G.', item: 'Diamond Stud', emoji: '💍', savings: '$650' },
  { id: 6, user: 'Alex N.', item: 'Adidas Ultraboost', emoji: '👟', savings: '$155' },
  { id: 7, user: 'James W.', item: 'Tiffany Cufflink', emoji: '✨', savings: '$160' },
  { id: 8, user: 'Lisa M.', item: 'Cashmere Glove', emoji: '🧤', savings: '$53' },
]

export default function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % matchEvents.length)
        setIsVisible(true)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const event = matchEvents[currentIndex]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-md border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-xs text-slate-500 font-medium">LIVE</span>
        </div>
        
        <div className={`flex items-center gap-3 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="text-lg">{event.emoji}</span>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-cyan-400">{event.user}</span>
            {' '}just found the mate for their{' '}
            <span className="font-semibold text-slate-100">{event.item}</span>
          </p>
          <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-semibold">
            Saved {event.savings}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 ml-4">
          {matchEvents.map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all ${
                i === currentIndex ? 'bg-cyan-400 w-3' : 'bg-slate-700'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
