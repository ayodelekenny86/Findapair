import AnimatedCounter from './AnimatedCounter'

export default function StatsBar() {
  const stats = [
    { value: 12847, label: 'Active members', suffix: '', icon: '👥' },
    { value: 3291, label: 'Pairs matched', suffix: '', icon: '🔗' },
    { value: 8562, label: 'Free items given', suffix: '', icon: '🎁' },
    { value: 4.2, label: 'Tons waste prevented', suffix: 't', decimals: 1, icon: '♻️' },
  ]

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center py-8 px-4"
              style={{ background: 'rgba(17, 17, 19, 1)' }}
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={(stat as any).decimals || 0} />
              </div>
              <div className="text-[12px] text-zinc-500 font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
