import { useState, useEffect } from 'react'

interface Activity {
  id: number
  type: 'match' | 'free' | 'donation' | 'post'
  message: string
  time: string
  emoji: string
}

const activities: Activity[] = [
  { id: 1, type: 'match', message: 'Sarah K. found the mate for her gold hoop earring!', time: '2m ago', emoji: '💎' },
  { id: 2, type: 'free', message: 'Tom B. gave away a kids bicycle in Austin', time: '5m ago', emoji: '🚲' },
  { id: 3, type: 'donation', message: 'Lisa M. donated 20+ cookbooks to local library', time: '12m ago', emoji: '♻️' },
  { id: 4, type: 'post', message: 'Mike R. posted a right Nike Air Max - Size 10', time: '18m ago', emoji: '👟' },
  { id: 5, type: 'match', message: 'Emma T. matched her pearl stud earring!', time: '25m ago', emoji: '🦪' },
  { id: 6, type: 'free', message: 'James P. listed a working microwave for free', time: '32m ago', emoji: '📦' },
]

export default function ActivityFeed() {
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 6))
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setVisibleActivities(prev => {
        const newActivity = { ...activities[Math.floor(Math.random() * activities.length)], id: Date.now(), time: 'Just now' }
        return [newActivity, ...prev.slice(0, 5)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [isLive])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'match': return { label: 'Pair found', class: 'badge-accent' }
      case 'free': return { label: 'Free item', class: 'badge-success' }
      case 'donation': return { label: 'Donation', class: 'badge-success' }
      case 'post': return { label: 'New post', class: 'badge-warning' }
      default: return { label: 'Activity', class: 'badge-accent' }
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="eyebrow mb-2 block">Community</span>
                <h3 className="heading-md">Live activity</h3>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                  isLive ? 'text-emerald-400' : 'text-zinc-500'
                }`}
                style={{ background: isLive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isLive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)'}` }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse-soft' : 'bg-zinc-600'}`}></span>
                {isLive ? 'Live' : 'Paused'}
              </button>
            </div>

            <div className="space-y-2">
              {visibleActivities.map((activity, i) => {
                const badge = getTypeBadge(activity.type)
                return (
                  <div
                    key={activity.id}
                    className="panel p-4 flex items-start gap-3"
                    style={i === 0 ? { animation: 'fade-in 0.4s ease-out' } : {}}
                  >
                    <span className="text-xl flex-shrink-0">{activity.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-zinc-300 leading-relaxed">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] text-zinc-600">{activity.time}</span>
                        <span className={`badge ${badge.class} !text-[10px] !py-0.5 !px-2`}>{badge.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Impact Dashboard */}
          <div>
            <div className="mb-6">
              <span className="eyebrow mb-2 block">Impact</span>
              <h3 className="heading-md">Environmental impact</h3>
            </div>

            <div className="panel p-6 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">4.2</div>
                  <div className="text-[11px] text-zinc-500">Tons waste prevented</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">12.8</div>
                  <div className="text-[11px] text-zinc-500">Tons CO₂ saved</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">3,291</div>
                  <div className="text-[11px] text-zinc-500">Items reunited</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">8,562</div>
                  <div className="text-[11px] text-zinc-500">Free items given</div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="panel p-6">
              <h4 className="text-[12px] font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Monthly waste prevented (tons)</h4>
              <div className="flex items-end gap-1.5 h-28">
                {[0.8, 1.2, 1.5, 1.8, 2.1, 2.4, 2.8, 3.1, 3.5, 3.8, 4.0, 4.2].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(value / 4.2) * 100}%`, background: 'linear-gradient(to top, #06b6d4, #22d3ee)' }}
                    ></div>
                    {i % 3 === 0 && (
                      <span className="text-[9px] text-zinc-600">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[11px] text-zinc-600">
                <span>Jan 2026</span>
                <span className="text-cyan-400 font-medium">↑ 23% growth</span>
                <span>Dec 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
