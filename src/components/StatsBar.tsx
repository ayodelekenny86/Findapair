import AnimatedCounter from './AnimatedCounter'

export default function StatsBar() {
  const stats = [
    { value: 12847, label: 'Active Members', icon: '👥', trend: '+124 today', suffix: '' },
    { value: 3291, label: 'Pairs Matched', icon: '🔗', trend: '+18 this week', suffix: '' },
    { value: 8562, label: 'Free Items Given', icon: '🎁', trend: '+302 this week', suffix: '' },
    { value: 4.2, label: 'Tons Waste Prevented', icon: '♻️', trend: '↑ 23% vs last month', suffix: 't', decimals: 1 },
  ]

  return (
    <section className="py-8 border-y border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-light rounded-xl p-4 text-center card-hover group"
            >
              <span className="text-2xl mb-2 block group-hover:animate-wiggle">{stat.icon}</span>
              <div className="text-2xl font-bold gradient-text">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              <div className="text-xs text-cyan-500/70 mt-1">{stat.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
