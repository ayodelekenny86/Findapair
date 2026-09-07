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
import { ToastContainer, useToasts } from './components/Toast'
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

  const handleCloseModal = () => {
    setShowPostModal(false)
    // Show confetti and toast on close (simulating successful post)
    setShowConfetti(true)
    addToast({
      type: 'success',
      title: postType === 'pair' ? 'Item Posted!' : 'Free Item Listed!',
      message: postType === 'pair'
        ? 'Our AI is scanning for matches. You\'ll be notified soon!'
        : 'Your item is now live on the FreeItem Network!',
      emoji: postType === 'pair' ? '🔗' : '🎁',
    })
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-[Inter] bg-grid pb-12">
      {/* Scroll Progress + Scroll to Top */}
      <ScrollToTop />

      {/* Confetti Effect */}
      <Confetti active={showConfetti} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Navigation */}
      <Navbar onPostItem={handlePostItem} activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <Hero activeSection={activeSection} setActiveSection={setActiveSection} onPostItem={handlePostItem} />

      {/* Animated Stats */}
      <StatsBar />

      {/* Main Content Sections */}
      {activeSection === 'findapair' ? (
        <FindAPairSection onPostItem={handlePostItem} addToast={addToast} />
      ) : (
        <FreeItemNetwork onPostItem={handlePostItem} addToast={addToast} />
      )}

      {/* Smart Features */}
      <SmartFeatures />

      {/* Live Activity + Impact */}
      <ActivityFeed />

      {/* Community Leaderboard */}
      <Leaderboard />

      {/* Testimonials */}
      <Testimonials />

      {/* Eco Calculator */}
      <EcoCalculator />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {showPostModal && (
        <PostItemModal type={postType} onClose={handleCloseModal} />
      )}

      {/* Floating Interactive Elements */}
      <FloatingChat />
      <InteractiveQuiz />
      <LiveTicker />
    </div>
  )
}

export default App
