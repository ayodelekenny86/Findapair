export function SkeletonCard() {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-zinc-800 rounded-lg"></div>
        <div className="w-12 h-5 bg-zinc-800 rounded"></div>
      </div>
      <div className="h-4 bg-zinc-800 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-zinc-800 rounded mb-3 w-full"></div>
      <div className="h-3 bg-zinc-800 rounded mb-3 w-2/3"></div>
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-zinc-800 rounded-full"></div>
          <div className="w-20 h-3 bg-zinc-800 rounded"></div>
        </div>
        <div className="w-12 h-4 bg-zinc-800 rounded"></div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 animate-pulse">
          <div className="h-8 bg-zinc-800 rounded mb-2"></div>
          <div className="h-3 bg-zinc-800 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonLine() {
  return (
    <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
  )
}

export function SkeletonCircle({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  }
  return <div className={`${sizes[size]} bg-zinc-800 rounded-full animate-pulse`}></div>
}
