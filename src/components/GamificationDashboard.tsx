import { useState, useEffect } from 'react'
import { gamificationService, ACHIEVEMENTS, LEVELS } from '../lib/gamification'
import { db } from '../lib/db'

export default function GamificationDashboard() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [userLevel, setUserLevel] = useState<any>(null)
  const [levelProgress, setLevelProgress] = useState<any>(null)
  const [newlyUnlocked, setNewlyUnlocked] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const user = db.getCurrentUser()
    const allAchievements = gamificationService.getAllAchievements()
    const level = gamificationService.getUserLevel(user.points)
    const progress = gamificationService.getLevelProgress(user.points)

    setAchievements(allAchievements)
    setUserLevel(level)
    setLevelProgress(progress)
  }

  const handleCheckAchievements = () => {
    const unlocked = gamificationService.checkAchievements()
    if (unlocked.length > 0) {
      setNewlyUnlocked(unlocked)
      loadData() // Reload to show updated status
      
      // Clear notification after 5 seconds
      setTimeout(() => setNewlyUnlocked([]), 5000)
    }
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="space-y-6">
      {/* Newly Unlocked Notification */}
      {newlyUnlocked.length > 0 && (
        <div className="panel p-4 border-2 border-cyan-500/50 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div className="flex-1">
              <div className="font-bold text-white">Achievement Unlocked!</div>
              <div className="text-sm text-zinc-400">
                {newlyUnlocked.map(a => a.title).join(', ')}
              </div>
            </div>
            <div className="text-cyan-400 font-bold">
              +{newlyUnlocked.reduce((sum, a) => sum + a.points, 0)} pts
            </div>
          </div>
        </div>
      )}

      {/* Level Card */}
      <div className="panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{userLevel?.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{userLevel?.title}</h3>
              <p className="text-sm text-zinc-400">Level {userLevel?.level}</p>
              <p className="text-xs text-zinc-500 mt-1">
                {db.getCurrentUser().points} total points
              </p>
            </div>
          </div>
          <button
            onClick={handleCheckAchievements}
            className="btn-primary"
          >
            Check Achievements
          </button>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-zinc-400">Progress to Level {levelProgress?.next}</span>
            <span className="text-cyan-400 font-bold">{levelProgress?.progress.toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${levelProgress?.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{unlockedCount}</div>
          <div className="text-sm text-zinc-400">Unlocked</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{totalCount}</div>
          <div className="text-sm text-zinc-400">Total</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {((unlockedCount / totalCount) * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-zinc-400">Complete</div>
        </div>
      </div>

      {/* Achievements by Category */}
      {['posting', 'matching', 'social', 'eco'].map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category)
        const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length

        return (
          <div key={category} className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white capitalize">{category}</h3>
              <span className="text-sm text-zinc-400">
                {unlockedInCategory}/{categoryAchievements.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30'
                      : 'bg-zinc-800/30 border-zinc-700/30 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-white">{achievement.title}</div>
                      <div className="text-sm text-zinc-400 mt-1">{achievement.description}</div>
                      <div className="flex items-center gap-2 mt-2">
                        {achievement.unlocked ? (
                          <>
                            <span className="text-xs text-green-400">✓ Unlocked</span>
                            <span className="text-xs text-cyan-400">+{achievement.points} pts</span>
                          </>
                        ) : (
                          <span className="text-xs text-zinc-500">
                            Locked • {achievement.points} pts
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* All Levels */}
      <div className="panel p-6">
        <h3 className="text-lg font-bold text-white mb-4">All Levels</h3>
        <div className="space-y-2">
          {LEVELS.map(level => (
            <div
              key={level.level}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                userLevel?.level === level.level
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-zinc-800/30'
              }`}
            >
              <div className="text-2xl">{level.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-white">{level.title}</div>
                <div className="text-xs text-zinc-500">
                  {level.minPoints} - {level.maxPoints === Infinity ? '∞' : level.maxPoints} points
                </div>
              </div>
              {userLevel?.level === level.level && (
                <div className="text-xs text-cyan-400 font-bold">Current</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
