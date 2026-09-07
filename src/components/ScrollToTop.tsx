import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setVisible(scrollTop > 400)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 glass rounded-full flex items-center justify-center card-hover glow-sm animate-bounce-in"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  )
}
