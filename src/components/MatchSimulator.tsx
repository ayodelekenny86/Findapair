import { useState, useEffect } from 'react'

interface MatchStep {
  label: string
  icon: string
  detail: string
  progress: number
}

const steps: MatchStep[] = [
  { label: 'Analyzing item', icon: '🔍', detail: 'Scanning brand, material, color, and dimensions...', progress: 15 },
  { label: 'Scanning database', icon: '🗄️', detail: 'Searching through 12,847 active listings...', progress: 35 },
  { label: 'Comparing attributes', icon: '⚖️', detail: 'Matching size, style, condition, and compatibility...', progress: 55 },
  { label: 'AI scoring', icon: '🧠', detail: 'Neural network computing match confidence...', progress: 75 },
  { label: 'Ranking results', icon: '📊', detail: 'Sorting by match confidence and proximity...', progress: 90 },
  { label: 'Match found!', icon: '✅', detail: 'Best match: 94% confidence — Gold Hoop Earring, 14k', progress: 100 },
]

export default function MatchSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)

    return () => clearInterval(stepInterval)
  }, [isRunning])

  useEffect(() => {
    if (isRunning) {
      setProgress(steps[currentStep].progress)
    }
  }, [currentStep, isRunning])

  const startSimulation = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsRunning(true)
  }

  const resetSimulation = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsRunning(false)
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>🧠</span> AI Match Simulator
          </h3>
          <p className="text-sm text-slate-500 mt-1">See how our AI finds the perfect match in real-time</p>
        </div>
        <button
          onClick={isRunning ? resetSimulation : startSimulation}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            isRunning
              ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
              : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 hover:from-cyan-400 hover:to-cyan-300 glow-sm'
          }`}
        >
          {isRunning ? '⏹ Stop' : '▶ Run Simulation'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Progress</span>
          <span className="text-cyan-400 font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`rounded-xl p-3 text-center transition-all duration-300 ${
              i === currentStep && isRunning
                ? 'glass glow-sm border-cyan-500/30 scale-105'
                : i < currentStep || (!isRunning && currentStep === steps.length - 1 && i === steps.length - 1)
                ? 'bg-cyan-500/10 border border-cyan-500/20'
                : 'bg-slate-800/50 border border-slate-700/30'
            }`}
          >
            <span className={`text-2xl block mb-1 ${i === currentStep && isRunning ? 'animate-wiggle' : ''}`}>
              {step.icon}
            </span>
            <p className={`text-xs font-semibold ${
              i <= currentStep ? 'text-slate-200' : 'text-slate-600'
            }`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Current Step Detail */}
      {(isRunning || progress === 100) && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-cyan-500/10 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-xl">{steps[currentStep].icon}</span>
            <div>
              <p className="text-sm font-semibold text-cyan-400">{steps[currentStep].label}</p>
              <p className="text-xs text-slate-400">{steps[currentStep].detail}</p>
            </div>
            {isRunning && (
              <div className="ml-auto flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full typing-dot"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full typing-dot"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full typing-dot"></span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result Card (shown when complete) */}
      {!isRunning && progress === 100 && (
        <div className="mt-4 glass-light rounded-xl p-4 border border-green-500/20 animate-bounce-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-100">Left Gold Hoop Earring - 14k</p>
              <p className="text-xs text-slate-500">Manhattan, NY • Posted 2 hours ago • $85</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-400">94%</div>
              <div className="text-[10px] text-slate-500">Match</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
