import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Listings from './components/Listings'
import PostItemModal from './components/PostItemModal'
import ItemDetail from './components/ItemDetail'
import ToastContainer, { useToasts } from './components/Toast'
import FloatingChat from './components/FloatingChat'
import QuickStats from './components/QuickStats'
import ActivityFeed from './components/ActivityFeed'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import CommandPalette from './components/CommandPalette'
import MobileNav from './components/MobileNav'
import { initializeDatabase, itemsApi, userApi } from './lib/api'
import { db } from './lib/db'
import type { Item } from './lib/db'

function App() {
  const [activeTab, setActiveTab] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const { toasts, addToast, removeToast } = useToasts()

  useEffect(() => {
    initializeDatabase()
    loadItems()
  }, [])

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await itemsApi.getAll()
      if (response.success && response.data) {
        setItems(response.data)
      }
    } catch (error) {
      addToast({ type: 'error', title: 'Failed to load', message: 'Please refresh', emoji: '⚠️' })
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
      const itemType = postType === 'pair' ? 'pair' : 'free'
      const response = await itemsApi.create({
        type: itemType,
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
        addToast({ type: 'success', title: 'Posted!', message: 'Item is now live', emoji: '✓' })
        await loadItems()
      }
    } catch (error) {
      addToast({ type: 'error', title: 'Failed', message: 'Try again', emoji: '⚠️' })
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
          title: response.data.added ? 'Saved' : 'Removed',
          message: response.data.added ? 'Added to wishlist' : 'Removed from wishlist',
          emoji: response.data.added ? '❤️' : '💔',
        })
      }
    } catch {}
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault()
        setShowCommandPalette(true)
      } else if (e.key === '?') {
        e.preventDefault()
        setShowShortcuts(true)
      } else if (e.key === '1') {
        setActiveTab('findapair')
      } else if (e.key === '2') {
        setActiveTab('freeitem')
      } else if (e.key === 'p' || e.key === 'P') {
        handlePostItem(activeTab === 'findapair' ? 'pair' : 'free')
      } else if (e.key === 'Escape') {
        setShowPostModal(false)
        setSelectedItem(null)
        setShowShortcuts(false)
        setShowCommandPalette(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab])

  const filteredItems = items.filter(i => i.type === (activeTab === 'findapair' ? 'pair' : 'free'))

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-[Inter]">
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPostItem={handlePostItem}
        onShowShortcuts={() => setShowShortcuts(true)}
        onShowCommandPalette={() => setShowCommandPalette(true)}
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-8">
        <Hero 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onPostItem={handlePostItem}
        />
        
        <QuickStats />
        
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Listings
            items={filteredItems}
            type={activeTab}
            onPostItem={handlePostItem}
            onSelectItem={handleSelectItem}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
        
        <ActivityFeed />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPostItem={handlePostItem}
      />

      {/* Floating Elements */}
      <FloatingChat />

      {/* Modals */}
      {showPostModal && (
        <PostItemModal 
          type={postType} 
          onClose={() => setShowPostModal(false)}
          onSubmit={handlePostSuccess}
        />
      )}

      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={db.getCurrentUser().wishlist.includes(selectedItem.id)}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}

      {showCommandPalette && (
        <CommandPalette
          onClose={() => setShowCommandPalette(false)}
          onNavigate={setActiveTab}
          onPostItem={handlePostItem}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

export default App
