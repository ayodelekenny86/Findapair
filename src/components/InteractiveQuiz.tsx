import { useState, useEffect } from 'react'

interface QuizQuestion {
  question: string
  options: string[]
  icon: string
}

const questions: QuizQuestion[] = [
  {
    question: 'What did you lose?',
    options: ['An earring', 'A shoe', 'A glove', 'Something else'],
    icon: '🔍',
  },
  {
    question: 'How valuable is it?',
    options: ['Under $50', '$50-$200', '$200-$500', 'Over $500'],
    icon: '💰',
  },
  {
    question: 'How long ago did you lose it?',
    options: ['Today', 'This week', 'This month', 'A while ago'],
    icon: '⏰',
  },
  {
    question: 'Do you want to find it or sell what you have?',
    options: ['I need to find the mate', 'I have the mate to sell', 'I want to give it away free', 'Not sure yet'],
    icon: '🎯',
  },
]

export default function InteractiveQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers([])
    setShowResult(false)
  }

  const getResult = () => {
    if (answers[3] === 'I need to find the mate') {
      return {
        title: 'Find a Pair is for you!',
        description: 'Post what you lost and our AI will scan thousands of listings to find the mate. Average match time: 48 hours.',
        cta: 'Browse Solo Items',
        emoji: '🔗',
        color: 'from-cyan-500 to-blue-500',
      }
    }
    if (answers[3] === 'I have the mate to sell') {
      return {
        title: 'List Your Solo Item!',
        description: `Based on your answers, we suggest pricing your item between $${answers[1] === 'Under $50' ? '15-30' : answers[1] === '$50-$200' ? '40-120' : '150-350'}. You'll save buyers 60-70% vs retail!`,
        cta: 'Post Your Item',
        emoji: '💎',
        color: 'from-purple-500 to-pink-500',
      }
    }
    if (answers[3] === 'I want to give it away free') {
      return {
        title: 'FreeItem Network!',
        description: 'List your item for free on our network. Someone in your area will claim it within hours. Help reduce waste!',
        cta: 'List Free Item',
        emoji: '🎁',
        color: 'from-green-500 to-emerald-500',
      }
    }
    return {
      title: 'Explore Both Options!',
      description: 'Whether you want to find, sell, or give away — FindAPair has you covered. Browse listings or post your item.',
      cta: 'Browse All',
      emoji: '✨',
      color: 'from-amber-500 to-orange-500',
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="glass rounded-2xl p-4 card-hover glow-sm group flex items-center gap-3"
        >
          <span className="text-2xl group-hover:animate-wiggle">🧠</span>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-100">Need Help?</p>
            <p className="text-xs text-cyan-400">Take our quick quiz →</p>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[380px] max-w-[calc(100vw-3rem)]">
      <div className="glass rounded-2xl overflow-hidden glow shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-cyan-500/10 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <div>
              <p className="text-sm font-bold text-slate-100">Smart Assistant</p>
              <p className="text-xs text-slate-500">Let's find the best option for you</p>
            </div>
          </div>
          <button
            onClick={() => { setIsOpen(false); resetQuiz(); }}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-500"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        {!showResult && (
          <div className="px-4 pt-3">
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    i <= currentStep ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-1.5">Step {currentStep + 1} of {questions.length}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {!showResult ? (
            <div className="animate-fade-in" key={currentStep}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{questions[currentStep].icon}</span>
                <h4 className="font-bold text-slate-100">{questions[currentStep].question}</h4>
              </div>
              <div className="space-y-2">
                {questions[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left px-4 py-3 rounded-xl glass-light hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all text-sm text-slate-300 hover:text-slate-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-bounce-in text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getResult().color} flex items-center justify-center`}>
                <span className="text-3xl">{getResult().emoji}</span>
              </div>
              <h4 className="font-bold text-slate-100 text-lg mb-2">{getResult().title}</h4>
              <p className="text-sm text-slate-400 mb-4">{getResult().description}</p>
              <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all">
                {getResult().cta} →
              </button>
              <button
                onClick={resetQuiz}
                className="mt-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Take quiz again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
