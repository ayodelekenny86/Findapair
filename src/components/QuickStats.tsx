import { useEffect, useState } from 'react'
import { db } from '../lib/db'

export default function QuickStats() {
  const [stats, setStats] = useState({
    itemsPosted: 0,
    itemsMatched: 0,
    wishlistCount: 0,
    trustScore: 0,
  })

  useEffect(() => {
    const user = db.getCurrentUser()
    const items = db.getItems().filter(i => i.sellerId === user.id)
    setStats({
      itemsPosted: items.length,
      itemsMatched: items.filter(i => i.status === 'matched').length,
      wishlistCount: user.wishlist.length,
      trustScore: user.trustScore,
    })
  }, [])

  return (
    <section className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-cyan-400">{stats.itemsPosted}</div>
          <div className="text-xs text-zinc-500 mt-1">Items Posted</div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-emerald-400">{stats.itemsMatched}</div>
          <div className="text-xs text-zinc-500 mt-1">Matched</div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">{stats.wishlistCount}</div>
          <div className="text-xs text-zinc-500 mt-1">Saved</div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-amber-400">{stats.trustScore}</div>
          <div className="text-xs text-zinc-500 mt-1">Trust Score</div>
        </div>
      </div>
    </section>
  )
}
