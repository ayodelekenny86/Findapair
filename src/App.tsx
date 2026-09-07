import { useState, useEffect } from 'react'
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
import ItemDetailModal from './components/ItemDetailModal'
import UserDashboard from './components/UserDashboard'
import CommandPalette from './components/CommandPalette'
import AdvancedFilters from './components/AdvancedFilters'
import ReferralSystem from './components/ReferralSystem'
import PriceHistoryChart from './components/PriceHistoryChart'

function App() {
  const [activeSection, setActiveSection] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
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

  const handleNavigate = (section: string) => {
    if (section === 'findapair' || section === 'freeitem') {
      setActiveSection(section)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault()
        setShowCommandPalette(true)
      } else if (e.key === '?') {
        e.preventDefault()
        alert('Keyboard shortcuts:\n\n/ or ⌘K - Open command palette\n? - Show this help\nEsc - Close modals\n1 - Go to Find a Pair\n2 - Go to FreeItem Network\nP - Post item\nD - Open dashboard')
      } else if (e.key === '1') {
        setActiveSection('findapair')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (e.key === '2') {
        setActiveSection('freeitem')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (e.key === 'p' || e.key === 'P') {
        handlePostItem(activeSection === 'findapair' ? 'pair' : 'free')
      } else if (e.key === 'd' || e.key === 'D') {
        setShowDashboard(true)
      } else if (e.key === 'Escape') {
        setShowPostModal(false)
        setSelectedItem(null)
        setShowDashboard(false)
        setShowCommandPalette(false)
        setShowAdvancedFilters(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection])

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-[Inter] bg-grid bg-noise">
      <Navbar 
        onPostItem={handlePostItem} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onOpenDashboard={() => setShowDashboard(true)}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
      />
      <Hero activeSection={activeSection} setActiveSection={setActiveSection} onPostItem={handlePostItem} />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>
      
      <StatsBar />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>
      
      {activeSection === 'findapair' ? (
        <FindAPairSection 
          onPostItem={handlePostItem} 
          addToast={addToast}
          onSelectItem={setSelectedItem}
          onOpenFilters={() => setShowAdvancedFilters(true)}
        />
      ) : (
        <FreeItemNetwork 
          onPostItem={handlePostItem} 
          addToast={addToast}
          onSelectItem={setSelectedItem}
        />
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

      <ReferralSystem />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <div className="max-w-4xl mx-auto px-6">
        <PriceHistoryChart />
      </div>
      
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

      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          type={activeSection === 'findapair' ? 'pair' : 'free'} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {showDashboard && (
        <UserDashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
      )}

      {showCommandPalette && (
        <CommandPalette 
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          onNavigate={handleNavigate}
          onPostItem={handlePostItem}
        />
      )}

      {showAdvancedFilters && (
        <AdvancedFilters
          isOpen={showAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          onApply={(filters) => {
            addToast({
              type: 'info',
              title: 'Filters applied',
              message: 'Results updated with your filters',
              emoji: '🔍',
            })
          }}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Confetti */}
      <Confetti active={showConfetti} />
    </div>
  )
}

export default App
