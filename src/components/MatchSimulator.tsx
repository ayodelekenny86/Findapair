import { useState, useEffect } from 'react'

export default function MatchSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [matchFound, setMatchFound] = useState(false)

  const steps = [
    { label: 'Analyzing item details...', icon: '🔍' },
    { label: 'Scanning 12,847 listings...', icon: '🧠' },
    { label: 'Comparing attributes...', icon: '⚙️' },
    { label: 'Calculating match scores...', icon: '📊' },
    { label: 'Match found!', icon: '✅' },
  ]

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsRunning(false)
          setMatchFound(true)
          return 100
        }
        const newProgress = prev + 2
        const step = Math.floor(newProgress / 20)
        if (step !== currentStep && step < steps.length) setCurrentStep(step)
        return newProgress
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isRunning, currentStep])

  const reset = () => {
    setIsRunning(false)
    setProgress(0)
    setCurrentStep(0)
    setMatchFound(false)
  }

  return (
    <div className="panel p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="heading-md mb-2">Try our <span className="gradient-text">AI Match Engine</span></h3>
        <p className="text-[13px] text-zinc-500">See how our smart algorithm finds matches in real-time</p>
      </div>

      <div className="max-w-lg mx-auto">
        {!isRunning && !matchFound && (
          <div className="text-center">
            <button onClick={() => setIsRunning(true)} className="btn-primary !py-3 !px-8">
              ▶ Run simulation
            </button>
          </div>
        )}

        {(isRunning || matchFound) && (
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-[11px] text-zinc-500 mb-2">
                <span>Progress</span>
                <span className="text-cyan-400 font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="match-bar h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2 mb-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg transition-all" style={{ background: i <= currentStep ? 'rgba(6,182,212,0.05)' : 'transparent', border: `1px solid ${i <= currentStep ? 'rgba(6,182,212,0.15)' : 'transparent'}` }}>
                  <span className="text-lg">{step.icon}</span>
                  <span className={`text-[13px] ${i <= currentStep ? 'text-white' : 'text-zinc-600'}`}>{step.label}</span>
                  {i < currentStep && <span className="ml-auto text-emerald-400 text-sm">✓</span>}
                </div>
              ))}
            </div>

            {matchFound && (
              <div className="text-center animate-fade-in">
                <div className="text-3xl mb-3">🎉</div>
                <p className="text-[14px] font-semibold text-white mb-1">Match found!</p>
                <p className="text-[12px] text-zinc-500 mb-4">94% confidence score • 2.3 seconds</p>
                <button onClick={reset} className="btn-secondary !text-[12px]">Run again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
