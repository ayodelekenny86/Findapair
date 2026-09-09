import { useState } from 'react'

export default function AdBanner({ size = 'leaderboard', position = 'top' }: { size?: 'leaderboard' | 'rectangle' | 'skyscraper', position?: string }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const sizes = {
    leaderboard: { width: '728px', height: '90px', mobileWidth: '320px', mobileHeight: '50px' },
    rectangle: { width: '336px', height: '280px', mobileWidth: '300px', mobileHeight: '250px' },
    skyscraper: { width: '160px', height: '600px', mobileWidth: '160px', mobileHeight: '600px' },
  }

  const currentSize = sizes[size]

  return (
    <div className="relative my-6 mx-auto" style={{ maxWidth: currentSize.width }}>
      <div 
        className="relative overflow-hidden rounded-lg"
        style={{ 
          width: '100%', 
          height: currentSize.height,
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        {/* Ad Content Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">📢</div>
            <p className="text-[12px] text-zinc-500">Advertisement</p>
            <p className="text-[10px] text-zinc-600 mt-1">
              {size === 'leaderboard' ? '728×90' : size === 'rectangle' ? '336×280' : '160×600'}
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
          aria-label="Dismiss ad"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ad Label */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] text-zinc-600" style={{ background: 'rgba(0,0,0,0.3)' }}>
          AD
        </div>
      </div>

      {/* Integration Note */}
      <div className="mt-2 text-center">
        <p className="text-[10px] text-zinc-600">
          Integrate with Google AdSense, Media.net, or Carbon Ads
        </p>
      </div>
    </div>
  )
}
