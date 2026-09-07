import { useState, useEffect } from 'react'

const tickerItems = [
  '💎 Sarah K. found a gold hoop earring mate',
  '🎁 Tom B. gave away a kids bicycle',
  '♻️ Lisa M. donated 20+ cookbooks',
  '👟 Mike R. posted Nike Air Max',
  '🦪 Emma T. matched pearl stud earring',
  '📦 James P. listed microwave for free',
  '🧥 Nina K. donated 3 winter coats',
  '👓 David P. found Ray-Ban lens',
]

export default function LiveTicker() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 py-2 overflow-hidden" style={{ background: 'rgba(10,10,11,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
      <div className="flex whitespace-nowrap ticker-scroll">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-[12px] text-zinc-400">
            {item}
            <span className="text-zinc-700">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
