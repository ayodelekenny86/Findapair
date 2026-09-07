import { useState, useEffect } from 'react'

interface Activity {
  id: number
  type: 'match' | 'free' | 'donation' | 'post'
  message: string
  time: string
  emoji: string
}

const activities: Activity[] = [
  { id: 1, type: 'match', message: 'Sarah K. found the mate for her gold hoop earring!', time: '2 min ago', emoji: '💎' },
  { id: 2, type: 'free', message: 'Tom B. gave away a kids bicycle in Austin', time: '5 min ago', emoji: '🚲' },
  { id: 3, type: 'donation', message: 'Lisa M. donated 20+ cookbooks to local library', time: '12 min ago', emoji: '♻️' },
  { id: 4, type: 'post', message: 'Mike R. posted a right Nike Air Max - Size 10', time: '18 min ago', emoji: '👟' },
  { id: 5, type: 'match', message: 'Emma T. matched her pearl stud earring!', time: '25 min ago', emoji: '🦪' },
  { id: 6, type: 'free', message: 'James P. listed a working microwave for free', time: '32 min ago', emoji: '📦' },
  { id: 7, type: 'donation', message: 'Nina K. donated 3 winter coats to shelter', time: '45 min ago', emoji: '🧥' },
  { id: 8, type: 'match', message: 'David P. found replacement Ray-Ban lens', time: '1 hour ago', emoji: '👓' },
  { id: 9, type: 'free', message: 'Robert H. gave away garden tools in Nashville', time: '1.5 hours ago', emoji: '🌿' },
  { id: 10, type: 'post', message: 'Rachel G. posted a diamond stud earring', time: '2 hours ago', emoji: '💍' },
]

export default function ActivityFeed() {
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 6))
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setVisibleActivities(prev => {
        const newActivity = {
          ...activities[Math.floor(Math.random() * activities.length)],
          id: Date.now(),
          time: 'Just now',
        }
        return [newActivity, ...prev.slice(0, 5)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [isLive])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'border-cyan-500/30 bg-cyan-500/5'
      case 'free': return 'border-green-500/30 bg-green-500/5'
      case 'donation': return 'border-emerald-500/30 bg-emerald-500/5'
      case 'post': return 'border-purple-500/30 bg-purple-500/5'
      default: return 'border-slate-700 bg-slate-800/50'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'match': return 'Pair Found'
      case 'free': return 'Free Item'
      case 'donation': return 'Donation'
      case 'post': return 'New Post'
      default: return 'Activity'
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-100">
                Live Activity
              </h3>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isLive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></span>
                {isLive ? 'Live' : 'Paused'}
              </button>
            </div>

            <div className="space-y-3">
              {visibleActivities.map((activity, i) => (
                <div
                  key={activity.id}
                  className={`glass-light rounded-xl p-4 border ${getTypeColor(activity.type)} ${
                    i === 0 ? 'animate-slide-up' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{activity.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200 leading-relaxed">{activity.message}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-slate-500">{activity.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activity.type === 'match' ? 'bg-cyan-500/10 text-cyan-400' :
                          activity.type === 'free' ? 'bg-green-500/10 text-green-400' :
                          activity.type === 'donation' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          {getTypeLabel(activity.type)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Dashboard */}
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-6">
              Environmental Impact
            </h3>

            <div className="glass rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <div className="text-3xl font-bold gradient-text">4.2</div>
                  <div className="text-xs text-slate-500 mt-1">Tons Waste Prevented</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <div className="text-3xl font-bold gradient-text">12.8</div>
                  <div className="text-xs text-slate-500 mt-1">Tons CO₂ Saved</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <div className="text-3xl font-bold gradient-text">3,291</div>
                  <div className="text-xs text-slate-500 mt-1">Items Reunited</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <div className="text-3xl font-bold gradient-text">8,562</div>
                  <div className="text-xs text-slate-500 mt-1">Free Items Given</div>
                </div>
              </div>
            </div>

            {/* Monthly Impact Chart (simulated) */}
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-slate-300 mb-4">Monthly Waste Prevented (tons)</h4>
              <div className="flex items-end gap-2 h-32">
                {[0.8, 1.2, 1.5, 1.8, 2.1, 2.4, 2.8, 3.1, 3.5, 3.8, 4.0, 4.2].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all hover:from-cyan-400 hover:to-cyan-200"
                      style={{ height: `${(value / 4.2) * 100}%` }}
                    ></div>
                    {i % 3 === 0 && (
                      <span className="text-[9px] text-slate-600">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs text-slate-500">
                <span>Jan 2026</span>
                <span className="text-cyan-400 font-semibold">↑ 23% growth</span>
                <span>Dec 2026</span>
              </div>
            </div>

            {/* Your Impact */}
            <div className="glass-light rounded-2xl p-5 mt-4 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">Y</span>
                </div>
                <div>
                  <p className="text-sm text-slate-300 font-medium">Your Impact</p>
                  <p className="text-xs text-slate-500">Join to track your personal environmental contribution</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
