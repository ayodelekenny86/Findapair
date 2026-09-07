export default function StatsBar() {
  const stats = [
    { icon: '👥', value: '12,847', label: 'Active Members' },
    { icon: '🔗', value: '3,291', label: 'Pairs Matched' },
    { icon: '🎁', value: '8,562', label: 'Free Items Given' },
    { icon: '♻️', value: '4.2 tons', label: 'Waste Prevented' },
  ]

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
