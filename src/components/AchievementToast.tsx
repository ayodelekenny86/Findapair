import { useState, useEffect } from 'react'

interface AchievementToast {
  id: string
  title: string
  description: string
  icon: string
  points: number
}

export default function AchievementToast() {
  const [toasts, setToasts] = useState<AchievementToast[]>([])
  const [queue, setQueue] = useState<AchievementToast[]>([])

  useEffect(() => {
    // Check for new achievements periodically
    const checkAchievements = () => {
      const lastCheck = localStorage.getItem('lastAchievementCheck')
      const now = Date.now()
      
      if (!lastCheck || now - parseInt(lastCheck) > 60000) { // Check every minute
        localStorage.setItem('lastAchievementCheck', now.toString())
        
        // Simulate checking for new achievements
        const user = JSON.parse(localStorage.getItem('findapair_currentUser') || '{}')
        const newAchievements = checkForNewAchievements(user)
        
        if (newAchievements.length > 0) {
          setQueue(prev => [...prev, ...newAchievements])
        }
      }
    }

    checkAchievements()
    const interval = setInterval(checkAchievements, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (queue.length > 0 && toasts.length < 3) {
      const [next, ...rest] = queue
      setToasts(prev => [...prev, next])
      setQueue(rest)

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== next.id))
      }, 5000)
    }
  }, [queue, toasts])

  const checkForNewAchievements = (user: any): AchievementToast[] => {
    const achievements: AchievementToast[] = []
    const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]')

    // Check first post
    if (user.itemsPosted >= 1 && !unlocked.includes('first_post')) {
      achievements.push({
        id: 'first_post',
        title: 'First Post!',
        description: 'You posted your first item',
        icon: '🎉',
        points: 10,
      })
      unlocked.push('first_post')
    }

    // Check 10 posts
    if (user.itemsPosted >= 10 && !unlocked.includes('ten_posts')) {
      achievements.push({
        id: 'ten_posts',
        title: 'Prolific Poster',
        description: 'You posted 10 items',
        icon: '📝',
        points: 50,
      })
      unlocked.push('ten_posts')
    }

    // Check first match
    if (user.itemsMatched >= 1 && !unlocked.includes('first_match')) {
      achievements.push({
        id: 'first_match',
        title: 'Matchmaker!',
        description: 'You found your first match',
        icon: '💕',
        points: 25,
      })
      unlocked.push('first_match')
    }

    // Check trust score 90+
    if (user.trustScore >= 90 && !unlocked.includes('trusted')) {
      achievements.push({
        id: 'trusted',
        title: 'Trusted Member',
        description: 'Your trust score reached 90+',
        icon: '⭐',
        points: 100,
      })
      unlocked.push('trusted')
    }

    localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked))
    return achievements
  }

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="bg-zinc-900 border-2 border-cyan-500/50 rounded-lg p-4 shadow-2xl animate-slide-in-right max-w-sm"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">{toast.icon}</div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-cyan-400 mb-1">{toast.title}</h4>
              <p className="text-xs text-zinc-400 mb-2">{toast.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-400">+{toast.points} points</span>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-zinc-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
