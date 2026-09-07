import { useState } from 'react'

export default function InteractiveQuiz() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const questions = [
    { question: 'What did you lose?', options: ['An earring', 'A shoe', 'A glove', 'Something else'], icon: '🔍' },
    { question: 'How valuable is it?', options: ['Under $50', '$50-$200', '$200-$500', 'Over $500'], icon: '💰' },
    { question: 'How long ago?', options: ['Today', 'This week', 'This month', 'A while ago'], icon: '⏰' },
    { question: 'What do you want?', options: ['Find the mate', 'Sell what I have', 'Give it away free', 'Not sure yet'], icon: '🎯' },
  ]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (currentStep < questions.length - 1) setCurrentStep(prev => prev + 1)
    else setShowResult(true)
  }

  const resetQuiz = () => { setCurrentStep(0); setAnswers([]); setShowResult(false); }

  const getResult = () => {
    if (answers[3] === 'Find the mate') return { title: 'Find a Pair is for you!', description: 'Post what you lost and our AI will scan thousands of listings.', cta: 'Browse Solo Items', emoji: '🔗' }
    if (answers[3] === 'Sell what I have') return { title: 'List Your Solo Item!', description: 'Our Smart Price Calculator suggests fair pricing.', cta: 'Post Your Item', emoji: '💎' }
    if (answers[3] === 'Give it away free') return { title: 'FreeItem Network!', description: 'List your item for free. Someone will claim it within hours.', cta: 'List Free Item', emoji: '🎁' }
    return { title: 'Explore Both Options!', description: 'Whether you want to find, sell, or give away — we have you covered.', cta: 'Browse All', emoji: '✨' }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
        <button onClick={() => setIsOpen(true)} className="panel-elevated p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 hover:border-cyan-500/20 transition-all">
          <span className="text-lg sm:text-xl">🧠</span>
          <div className="text-left">
            <p className="text-[11px] sm:text-[12px] font-semibold text-white">Need help?</p>
            <p className="text-[9px] sm:text-[10px] text-cyan-400">Take our quick quiz →</p>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 w-[calc(100vw-2rem)] sm:w-[340px] max-w-sm">
      <div className="panel-elevated overflow-hidden animate-scale-in">
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🧠</span>
            <div>
              <p className="text-[13px] font-semibold text-white">Smart Assistant</p>
              <p className="text-[10px] text-zinc-500">Let's find the best option</p>
            </div>
          </div>
          <button onClick={() => { setIsOpen(false); resetQuiz(); }} className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5">✕</button>
        </div>

        {!showResult && (
          <div className="px-4 pt-3">
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div key={i} className="h-0.5 flex-1 rounded-full" style={{ background: i <= currentStep ? '#06b6d4' : 'rgba(255,255,255,0.06)' }}></div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-1.5">Step {currentStep + 1} of {questions.length}</p>
          </div>
        )}

        <div className="p-4">
          {!showResult ? (
            <div className="animate-fade-in" key={currentStep}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{questions[currentStep].icon}</span>
                <h4 className="text-[14px] font-semibold text-white">{questions[currentStep].question}</h4>
              </div>
              <div className="space-y-2">
                {questions[currentStep].options.map((option, i) => (
                  <button key={i} onClick={() => handleAnswer(option)} className="w-full text-left px-4 py-2.5 rounded-lg text-[13px] text-zinc-400 hover:text-white transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in text-center">
              <div className="text-3xl mb-3">{getResult().emoji}</div>
              <h4 className="text-[15px] font-semibold text-white mb-2">{getResult().title}</h4>
              <p className="text-[12px] text-zinc-500 mb-4">{getResult().description}</p>
              <button className="btn-primary w-full !text-[13px]">{getResult().cta} →</button>
              <button onClick={resetQuiz} className="mt-2 text-[11px] text-zinc-600 hover:text-zinc-400">Take quiz again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
