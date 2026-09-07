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

function App() {
  const [activeSection, setActiveSection] = useState<'findapair' | 'freeitem'>('findapair')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'pair' | 'free'>('pair')

  const handlePostItem = (type: 'pair' | 'free') => {
    setPostType(type)
    setShowPostModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-[Inter] bg-grid">
      <Navbar onPostItem={handlePostItem} activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero activeSection={activeSection} setActiveSection={setActiveSection} onPostItem={handlePostItem} />
      <StatsBar />
      
      {activeSection === 'findapair' ? (
        <FindAPairSection onPostItem={handlePostItem} />
      ) : (
        <FreeItemNetwork onPostItem={handlePostItem} />
      )}

      <SmartFeatures />
      <ActivityFeed />
      <HowItWorks />
      <Footer />

      {showPostModal && (
        <PostItemModal type={postType} onClose={() => setShowPostModal(false)} />
      )}
    </div>
  )
}

export default App
