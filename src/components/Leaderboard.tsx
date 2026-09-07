import { useState } from 'react'

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  itemsMatched: number
  itemsGiven: number
  donations: number
  ecoScore: number
  trustScore: number
}

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'EcoWarrior_NY', avatar: '🌟', itemsMatched: 47, itemsGiven: 89, donations: 23, ecoScore: 980, trustScore: 99 },
  { rank: 2, name: 'PairFinder_Sarah', avatar: '💎', itemsMatched: 38, itemsGiven: 52, donations: 18, ecoScore: 870, trustScore: 98 },
  { rank: 3, name: 'FreeGiver_Mike', avatar: '🎁', itemsMatched: 12, itemsGiven: 134, donations: 45, ecoScore: 850, trustScore: 97 },
  { rank: 4, name: 'MatchMaster_Alex', avatar: '🔗', itemsMatched: 56, itemsGiven: 23, donations: 8, ecoScore: 780, trustScore: 96 },
  { rank: 5, name: 'GreenThumb_Lisa', avatar: '🌱', itemsMatched: 8, itemsGiven: 67, donations: 34, ecoScore: 720, trustScore: 95 },
  { rank: 6, name: 'ShoeHunter_Dave', avatar: '👟', itemsMatched: 34, itemsGiven: 12, donations: 5, ecoScore: 680, trustScore: 94 },
  { rank: 7, name: 'KindHeart_Nina', avatar: '❤️', itemsMatched: 15, itemsGiven: 98, donations: 41, ecoScore: 650, trustScore: 93 },
  { rank: 8, name: 'StyleMatch_Emma', avatar: '✨', itemsMatched: 29, itemsGiven: 34, donations: 12, ecoScore: 610, trustScore: 92 },
]

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<'ecoScore' | 'itemsMatched' | 'itemsGiven' | 'donations'>('ecoScore')
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month')

  const sorted = [...leaderboard].sort((a, b) => b[sortBy] - a[sortBy]).map((entry, i) => ({ ...entry, rank: i + 1 }))

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30'
    if (rank === 2) return 'bg-gradient-to-r from-slate-400/10 to-slate-300/10 border-slate-400/30'
    if (rank === 3) return 'bg-gradient-to-r from-amber-700/10 to-amber-600/10 border-amber-700/30'
    return 'bg-slate-800/30 border-slate-700/30'
  }

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Community <span className="gradient-text">Leaderboard</span>
          </h2>
          <p className="text-slate-400">Top contributors making the biggest environmental impact</p>
        </div>

        {/* Controls */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {(['week', 'month', 'all'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                    timeframe === tf
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tf === 'all' ? 'All Time' : `This ${tf}`}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {[
                { key: 'ecoScore' as const, label: '🌍 Eco' },
                { key: 'itemsMatched' as const, label: '🔗 Matches' },
                { key: 'itemsGiven' as const, label: '🎁 Given' },
                { key: 'donations' as const, label: '♻️ Donated' },
              ].map((sort) => (
                <button
                  key={sort.key}
                  onClick={() => setSortBy(sort.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === sort.key
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {sorted.map((entry) => (
            <div
              key={entry.rank}
              className={`glass-light rounded-xl p-4 flex items-center gap-4 card-hover border ${getRankStyle(entry.rank)}`}
            >
              {/* Rank */}
              <div className="w-10 text-center">
                {entry.rank <= 3 ? (
                  <span className="text-2xl">{getRankEmoji(entry.rank)}</span>
                ) : (
                  <span className="text-sm font-bold text-slate-500">{getRankEmoji(entry.rank)}</span>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-300/20 border border-cyan-500/20 flex items-center justify-center text-lg">
                  {entry.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-200 text-sm">{entry.name}</p>
                  <p className="text-xs text-slate-500">Trust: {entry.trustScore} ⭐</p>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex gap-4 text-center">
                <div>
                  <div className="text-sm font-bold text-cyan-400">{entry.itemsMatched}</div>
                  <div className="text-[10px] text-slate-600">Matched</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-green-400">{entry.itemsGiven}</div>
                  <div className="text-[10px] text-slate-600">Given</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">{entry.donations}</div>
                  <div className="text-[10px] text-slate-600">Donated</div>
                </div>
              </div>

              {/* Eco Score */}
              <div className="text-right">
                <div className="text-lg font-bold gradient-text">{entry.ecoScore}</div>
                <div className="text-[10px] text-slate-600">Eco Points</div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Position */}
        <div className="mt-6 glass rounded-xl p-4 border border-cyan-500/20 flex items-center gap-4">
          <div className="w-10 text-center">
            <span className="text-sm font-bold text-slate-500">#42</span>
          </div>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-sm font-bold text-slate-900">
              Y
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">Your Position</p>
              <p className="text-xs text-slate-500">Join and start contributing to climb the ranks!</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-lg font-semibold text-xs hover:from-cyan-400 hover:to-cyan-300 transition-all">
            Sign Up →
          </button>
        </div>
      </div>
    </section>
  )
}
