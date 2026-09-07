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
import ThemeToggle from './components/ThemeToggle'
import RecentlyViewed, { addToRecentlyViewed } from './components/RecentlyViewed'
import TrendingItems from './components/TrendingItems'
import AdvancedFilters, { FilterState } from './components/AdvancedFilters'
import UserProfile from './components/UserProfile'
import NotificationsCenter from './components/NotificationsCenter'
import SavedSearches from './components/SavedSearches'
import ItemComparison from './components/ItemComparison'
import ShareModal from './components/ShareModal'
import OfflineIndicator from './components/OfflineIndicator'
import VoiceSearch from './components/VoiceSearch'
import DataExport from './components/DataExport'
import WishlistPage from './components/WishlistPage'
import SearchSuggestions from './components/SearchSuggestions'
import SimilarItems from './components/SimilarItems'
import SellerReviews from './components/SellerReviews'
import QuickActions from './components/QuickActions'
import WelcomeTour from './components/WelcomeTour'
import ItemCollections from './components/ItemCollections'
import AnalyticsCharts from './components/AnalyticsCharts'
import DuplicateListing from './components/DuplicateListing'
import ReportItem from './components/ReportItem'
import BulkActions from './components/BulkActions'
import ItemHistory from './components/ItemHistory'
import PriceAlerts from './components/PriceAlerts'
import ItemTemplates from './components/ItemTemplates'
import LocationMapView from './components/LocationMapView'
import ItemNotes from './components/ItemNotes'
import SavedFilterPresets from './components/SavedFilterPresets'
import ItemStatusTracker from './components/ItemStatusTracker'
import BatchImport from './components/BatchImport'
import useTheme from './hooks/useTheme'
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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showCollections, setShowCollections] = useState(false)
  const [showDuplicate, setShowDuplicate] = useState(false)
  const [showWelcomeTour, setShowWelcomeTour] = useState(true)
  const [showReport, setShowReport] = useState(false)
  const [showPriceAlerts, setShowPriceAlerts] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showBatchImport, setShowBatchImport] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [compareItems, setCompareItems] = useState<Item[]>([])
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 1000,
    condition: [],
    location: '',
    radius: 50,
    verifiedOnly: false,
    sortBy: 'match',
  })
  const { toasts, addToast, removeToast } = useToasts()
  const { theme, toggleTheme } = useTheme()

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
        addToRecentlyViewed(response.data)
      } else {
        setSelectedItem(item)
        addToRecentlyViewed(item)
      }
    } catch {
      setSelectedItem(item)
      addToRecentlyViewed(item)
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
        onShowProfile={() => setShowProfile(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowExport={() => setShowExport(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-8">
        <Hero 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onPostItem={handlePostItem}
        />
        
        <QuickStats />
        
        <TrendingItems items={items} onSelectItem={handleSelectItem} />
        
        <RecentlyViewed onSelectItem={handleSelectItem} />
        
        <SavedFilterPresets
          currentFilters={filters}
          onApplyPreset={setFilters}
        />
        
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <Listings
              items={filteredItems}
              type={activeTab}
              onPostItem={handlePostItem}
              onSelectItem={handleSelectItem}
              onToggleWishlist={handleToggleWishlist}
              onOpenFilters={() => setShowAdvancedFilters(true)}
              selectedItems={selectedItems}
              onToggleSelect={(id) => {
                setSelectedItems(prev => 
                  prev.includes(id) 
                    ? prev.filter(i => i !== id)
                    : [...prev, id]
                )
              }}
            />
            
            <LocationMapView
              items={filteredItems}
              onSelectItem={handleSelectItem}
            />
          </>
        )}
        
        <ActivityFeed />
        
        <AnalyticsCharts />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPostItem={handlePostItem}
      />

      {/* Floating Elements */}
      <OfflineIndicator />
      <FloatingChat />
      <QuickActions
        onPostItem={() => handlePostItem(activeTab === 'findapair' ? 'pair' : 'free')}
        onOpenWishlist={() => setShowWishlist(true)}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
        onToggleTheme={toggleTheme}
      />

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

      {showAdvancedFilters && (
        <AdvancedFilters
          isOpen={showAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          onApply={setFilters}
          currentFilters={filters}
        />
      )}

      {showProfile && (
        <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}

      {showNotifications && (
        <NotificationsCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      )}

      {showComparison && (
        <ItemComparison
          items={compareItems}
          onRemove={(id) => setCompareItems(compareItems.filter(i => i.id !== id))}
          onClose={() => setShowComparison(false)}
        />
      )}

      {showShare && selectedItem && (
        <ShareModal
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          item={selectedItem}
        />
      )}

      {showExport && (
        <DataExport isOpen={showExport} onClose={() => setShowExport(false)} />
      )}

      {showWishlist && (
        <WishlistPage
          isOpen={showWishlist}
          onClose={() => setShowWishlist(false)}
          onSelectItem={(item) => {
            setShowWishlist(false)
            setSelectedItem(item)
          }}
          onRemoveFromWishlist={handleToggleWishlist}
        />
      )}

      {showCollections && (
        <ItemCollections
          isOpen={showCollections}
          onClose={() => setShowCollections(false)}
          allItems={items}
          onSelectItem={(item) => {
            setShowCollections(false)
            setSelectedItem(item)
          }}
        />
      )}

      {showDuplicate && selectedItem && (
        <DuplicateListing
          item={selectedItem}
          onSubmit={(itemData) => {
            handlePostSuccess(itemData)
            setShowDuplicate(false)
            setSelectedItem(null)
          }}
          onClose={() => setShowDuplicate(false)}
        />
      )}

      {showWelcomeTour && (
        <WelcomeTour onClose={() => setShowWelcomeTour(false)} />
      )}

      {showReport && selectedItem && (
        <ReportItem
          item={selectedItem}
          onClose={() => setShowReport(false)}
          onSubmit={(reason) => {
            addToast({
              type: 'success',
              title: 'Report submitted',
              message: 'Thank you for helping keep our community safe',
              emoji: '✓',
            })
            setShowReport(false)
          }}
        />
      )}

      {showPriceAlerts && (
        <PriceAlerts
          isOpen={showPriceAlerts}
          onClose={() => setShowPriceAlerts(false)}
        />
      )}

      {showTemplates && (
        <ItemTemplates
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          onUseTemplate={(template) => {
            setShowTemplates(false)
            handlePostItem('pair')
            addToast({
              type: 'info',
              title: 'Template loaded',
              message: 'Fill in the details to post your item',
              emoji: '📋',
            })
          }}
        />
      )}

      {showBatchImport && (
        <BatchImport
          isOpen={showBatchImport}
          onClose={() => setShowBatchImport(false)}
          onImport={(importedItems) => {
            // Add imported items to database
            importedItems.forEach(item => {
              itemsApi.create(item)
            })
            loadItems()
            addToast({
              type: 'success',
              title: 'Import successful',
              message: `${importedItems.length} items imported`,
              emoji: '✓',
            })
          }}
        />
      )}

      {selectedItems.length > 0 && (
        <BulkActions
          items={items}
          selectedItems={selectedItems}
          onClearSelection={() => setSelectedItems([])}
          onBulkAction={(action, itemIds) => {
            addToast({
              type: 'success',
              title: 'Bulk action completed',
              message: `${itemIds.length} items ${action}ed`,
              emoji: '✓',
            })
          }}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

export default App
