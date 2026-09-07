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
import AnalyticsDashboard from './components/AnalyticsDashboard'
import GamificationDashboard from './components/GamificationDashboard'
import LiveNotifications from './components/LiveNotifications'
import PricingPage from './components/PricingPage'
import AdBanner from './components/AdBanner'
import MonetizationGuide from './components/MonetizationGuide'
import { initializeDatabase, itemsApi, userApi } from './lib/api'
import { db } from './lib/db'
import { gamificationService } from './lib/gamification'
import type { Item } from './lib/db'

function App() {
  const [activeSection, setActiveSection] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const { toasts, addToast, removeToast } = useToasts()

  // Initialize database on mount
  useEffect(() => {
    initializeDatabase()
    loadItems()
    
    // Award daily login points
    gamificationService.awardPoints('daily_login')
  }, [])

  // Load items from database
  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await itemsApi.getAll()
      if (response.success && response.data) {
        setItems(response.data)
      }
    } catch (error) {
      console.error('Failed to load items:', error)
      addToast({
        type: 'error',
        title: 'Failed to load items',
        message: 'Please refresh the page',
        emoji: '⚠️',
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePostItem = (type: 'pair' | 'free') => {
    setPostType(type)
    setShowPostModal(true)
  }

  const handlePostSuccess = async (itemData: any) => {
    try {
      const user = db.getCurrentUser()
      
      const response = await itemsApi.create({
        type: itemData.type,
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        emoji: itemData.emoji || '📦',
        location: itemData.location,
        postedAgo: 'Just now',
        seller: user.name,
        sellerId: user.id,
        price: itemData.price,
        originalPrice: itemData.originalPrice,
        matchScore: Math.floor(Math.random() * 20) + 80,
        verified: user.trustScore > 90,
        condition: itemData.condition || 'Good',
        trustScore: user.trustScore,
        donationOption: itemData.donationOption || false,
        urgency: 'normal',
        images: [],
      })

      if (response.success) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
        
        // Award points for posting
        gamificationService.awardPoints('post_item')
        
        // Check for new achievements
        const unlocked = gamificationService.checkAchievements()
        if (unlocked.length > 0) {
          addToast({
            type: 'success',
            title: 'Achievement Unlocked!',
            message: unlocked.map(a => a.title).join(', '),
            emoji: '🏆',
          })
        }
        
        addToast({
          type: 'success',
          title: 'Item posted successfully!',
          message: 'Our AI is already scanning for matches.',
          emoji: '🎉',
        })
        await loadItems() // Refresh items
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to post item',
        message: 'Please try again',
        emoji: '⚠️',
      })
    }
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

  const handleSelectItem = async (item: Item) => {
    try {
      const response = await itemsApi.getById(item.id)
      if (response.success && response.data) {
        setSelectedItem(response.data)
      } else {
        setSelectedItem(item)
      }
    } catch {
      setSelectedItem(item)
    }
  }

  const handleToggleWishlist = async (itemId: string) => {
    try {
      const response = await userApi.toggleWishlist(itemId)
      if (response.success && response.data) {
        addToast({
          type: 'info',
          title: response.data.added ? 'Added to wishlist' : 'Removed from wishlist',
          message: response.data.added ? 'Item saved for later' : 'Item removed from wishlist',
          emoji: response.data.added ? '❤️' : '💔',
        })
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to update wishlist',
        message: 'Please try again',
        emoji: '⚠️',
      })
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault()
        setShowCommandPalette(true)
      } else if (e.key === '?') {
        e.preventDefault()
        alert('Keyboard shortcuts:\n\n/ or ⌘K - Open command palette\n? - Show this help\nEsc - Close modals\n1 - Go to Find a Pair\n2 - Go to FreeItem Network\nP - Post item\nD - Open dashboard\nA - Open analytics\nG - Open gamification')
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
      } else if (e.key === 'a' || e.key === 'A') {
        // Open analytics (you can add a state for this)
        console.log('Open analytics')
      } else if (e.key === 'g' || e.key === 'G') {
        // Open gamification (you can add a state for this)
        console.log('Open gamification')
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

  const pairItems = items.filter(i => i.type === 'pair')
  const freeItems = items.filter(i => i.type === 'free')

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-[Inter] bg-grid bg-noise">
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

      {/* Live Notifications */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <LiveNotifications />
      </div>

      <div className="separator-gradient max-w-6xl mx-auto"></div>
      
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-zinc-500">Loading items...</p>
        </div>
      ) : activeSection === 'findapair' ? (
        <FindAPairSection 
          items={pairItems}
          onPostItem={handlePostItem} 
          addToast={addToast}
          onSelectItem={handleSelectItem}
          onToggleWishlist={handleToggleWishlist}
          onOpenFilters={() => setShowAdvancedFilters(true)}
        />
      ) : (
        <FreeItemNetwork 
          items={freeItems}
          onPostItem={handlePostItem} 
          addToast={addToast}
          onSelectItem={handleSelectItem}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <SmartFeatures />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <HowItWorks />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <ActivityFeed />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      {/* Analytics Dashboard */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="heading-lg mb-6">Your Analytics</h2>
        <AnalyticsDashboard />
      </div>

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      {/* Gamification Dashboard */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="heading-lg mb-6">Achievements & Levels</h2>
        <GamificationDashboard />
      </div>

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <EcoCalculator />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <Leaderboard />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <ReferralSystem />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <PriceHistoryChart />
      </div>
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      <Testimonials />
      
      <div className="separator-gradient max-w-6xl mx-auto"></div>

      {/* Ad Banner - Between testimonials and FAQ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdBanner size="leaderboard" />
      </div>

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingPage />
      </div>

      <div className="separator-gradient max-w-6xl mx-auto"></div>

      {/* Monetization Guide for Site Owner */}
      <MonetizationGuide />

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
        <PostItemModal 
          type={postType} 
          onClose={() => setShowPostModal(false)}
          onSubmit={handlePostSuccess}
        />
      )}

      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          type={selectedItem.type} 
          onClose={() => setSelectedItem(null)}
          onToggleWishlist={handleToggleWishlist}
          addToast={addToast}
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
