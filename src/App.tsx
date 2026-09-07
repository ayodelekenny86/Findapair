import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import FindAPairSection from './components/FindAPairSection'
import FreeItemNetwork from './components/FreeItemNetwork'
import HowItWorks from './components/HowItWorks'
import PostItemModal from './components/PostItemModal'
import Footer from './components/Footer'
import StatsBar from './components/StatsBar'

function App() {
  const [activeTab, setActiveTab] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')

  const handlePostItem = (type: 'pair' | 'free') => {
    setPostType(type)
    setShowPostModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar onPostItem={handlePostItem} />
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatsBar />
      
      {activeTab === 'findapair' ? (
        <FindAPairSection onPostItem={handlePostItem} />
      ) : (
        <FreeItemNetwork onPostItem={handlePostItem} />
      )}

      <HowItWorks />
      <Footer />

      {showPostModal && (
        <PostItemModal
          type={postType}
          onClose={() => setShowPostModal(false)}
        />
      )}
    </div>
  )
}

export default App
