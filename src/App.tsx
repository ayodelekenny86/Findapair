import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import FindAPairSection from './components/FindAPairSection'
import FreeItemNetwork from './components/FreeItemNetwork'
import SmartFeatures from './components/SmartFeatures'
import HowItWorks from './components/HowItWorks'
import ActivityFeed from './components/ActivityFeed'
import Footer from './components/Footer'
import PostItemModal from './components/PostItemModal'
import ToastContainer, { useToasts } from './components/Toast'
import InteractiveQuiz from './components/InteractiveQuiz'
import ScrollToTop from './components/ScrollToTop'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import EcoCalculator from './components/EcoCalculator'
import FloatingChat from './components/FloatingChat'
import { Confetti } from './components/Confetti'
import LiveTicker from './components/LiveTicker'
import Leaderboard from './components/Leaderboard'

function App() {
  const [activeSection, setActiveSection] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')
  const [showConfetti, setShowConfetti] = useState(false)
  const { toasts, addToast, removeToast } = useToasts()

  const handlePostItem = (type: 'pair' | 'free') => {
    setPostType(type)
    setShowPostModal(true)
  }

  const handlePostSuccess = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
    addToast({
      type: 'success',
      title: 'Item posted successfully!',
      message: 'Our AI is already scanning for matches.',
      emoji: '🎉',
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-[Inter] bg-grid bg-noise">
      <Navbar onPostItem={handlePostItem} activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero activeSection={activeSection} setActiveSection={setActiveSection} onPostItem={handlePostItem} />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>
      
      <StatsBar />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>
      
      {activeSection === 'findapair' ? (
        <FindAPairSection onPostItem={handlePostItem} addToast={addToast} />
      ) : (
        <FreeItemNetwork onPostItem={handlePostItem} addToast={addToast} />
      )}

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <SmartFeatures />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <HowItWorks />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <ActivityFeed />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <EcoCalculator />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <Leaderboard />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <Testimonials />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <FAQ />

      <Footer />

      {/* Floating Elements */}
      <FloatingChat />
      <InteractiveQuiz />
      <ScrollToTop />
      <LiveTicker />

      {/* Modals */}
      {showPostModal && (
        <PostItemModal type={postType} onClose={() => { setShowPostModal(false); handlePostSuccess(); }} />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Confetti */}
      <Confetti active={showConfetti} />
    </div>
  )
}

export default App
