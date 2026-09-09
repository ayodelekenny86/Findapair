import { useEffect, useState } from 'react'
import { db } from '../lib/db'

interface Activity {
  id: string
  type: string
  message: string
  time: string
  emoji: string
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const user = db.getCurrentUser()
    const items = db.getItems().filter(i => i.sellerId === user.id)
    
    const recentActivities: Activity[] = items.slice(0, 5).map((item, i) => ({
      id: `activity-${i}`,
      type: 'post',
      message: `You posted "${item.title}"`,
      time: item.postedAgo,
      emoji: item.emoji,
    }))

    setActivities(recentActivities)
  }, [])

  if (activities.length === 0) {
    return (
      <section className="py-8">
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">📝</div>
          <p className="text-sm text-zinc-500">No recent activity</p>
          <p className="text-xs text-zinc-600 mt-1">Post your first item to get started!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
            <div className="text-2xl">{activity.emoji}</div>
            <div className="flex-1">
              <p className="text-sm text-zinc-300">{activity.message}</p>
              <p className="text-xs text-zinc-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
