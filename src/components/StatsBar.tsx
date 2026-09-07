export default function StatsBar() {
  const stats = [
    { value: '12,847', label: 'Active Members', icon: '👥', trend: '+124 today' },
    { value: '3,291', label: 'Pairs Matched', icon: '🔗', trend: '+18 this week' },
    { value: '8,562', label: 'Free Items Given', icon: '🎁', trend: '+302 this week' },
    { value: '4.2 tons', label: 'Waste Prevented', icon: '♻️', trend: '↑ 23% vs last month' },
  ]

  return (
    <section className="py-8 border-y border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-light rounded-xl p-4 text-center card-hover"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              <div className="text-xs text-cyan-500/70 mt-1">{stat.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
