export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Sarah K.', points: 2847, items: 23, badge: '🏆' },
    { rank: 2, name: 'Mike R.', points: 2156, items: 18, badge: '🥈' },
    { rank: 3, name: 'Emma T.', points: 1923, items: 15, badge: '🥉' },
    { rank: 4, name: 'David P.', points: 1654, items: 12, badge: '⭐' },
    { rank: 5, name: 'Rachel G.', points: 1432, items: 10, badge: '⭐' },
  ]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="eyebrow mb-3 block">Community</span>
          <h2 className="heading-lg mb-3">Top <span className="gradient-text">contributors</span></h2>
          <p className="text-body">Members making the biggest impact</p>
        </div>

        <div className="panel overflow-hidden">
          {leaders.map((leader, i) => (
            <div key={i} className="flex items-center gap-4 p-4" style={{ borderBottom: i < leaders.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span className="text-xl w-8 text-center">{leader.badge}</span>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-white">{leader.name}</p>
                <p className="text-[11px] text-zinc-500">{leader.items} items matched</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold gradient-text">{leader.points.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-600">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
