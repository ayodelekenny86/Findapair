import { useState, useEffect } from 'react'

interface WelcomeTourProps {
  onClose: () => void
}

export default function WelcomeTour({ onClose }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenWelcomeTour')
    if (!hasSeenTour) {
      setIsVisible(true)
    }
  }, [])

  const steps = [
    {
      title: 'Welcome to FindAPair! 👋',
      description: 'Find the mate of what you lost, or give away unwanted items for free.',
      icon: '🎉',
    },
    {
      title: 'Find a Pair 🔍',
      description: 'Browse items people are trying to match. Found the mate? Connect with the seller!',
      icon: '💎',
    },
    {
      title: 'FreeItem Network 🎁',
      description: 'Give away items you don\'t need. No money changes hands - just helping others!',
      icon: '♻️',
    },
    {
      title: 'Post Your Items 📝',
      description: 'Have a solo item? Post it and let our AI find potential matches for you.',
      icon: '✨',
    },
    {
      title: 'You\'re All Set! 🚀',
      description: 'Use keyboard shortcuts (press ?) to navigate faster. Happy matching!',
      icon: '⌨️',
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem('hasSeenWelcomeTour', 'true')
      setIsVisible(false)
      onClose()
    }
  }

  const handleSkip = () => {
    localStorage.setItem('hasSeenWelcomeTour', 'true')
    setIsVisible(false)
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
          <h2 className="text-xl font-bold text-white mb-3">{steps[currentStep].title}</h2>
          <p className="text-sm text-zinc-400 mb-6">{steps[currentStep].description}</p>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-cyan-400 w-6' : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
