import { useState } from 'react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    title: string
    description: string
    emoji: string
  }
}

export default function ShareModal({ isOpen, onClose, item }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareUrl = window.location.href
  const shareText = `Check out this item on FindAPair: ${item.title}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out: ${item.title}`)
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  // Generate simple QR code (text-based for demo)
  const generateQRPlaceholder = () => {
    return (
      <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-1">{item.emoji}</div>
          <div className="text-[8px] text-black font-mono">QR Code</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Share Item</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item Preview */}
          <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
            <div className="text-3xl">{item.emoji}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="text-xs text-zinc-500 truncate">{item.description}</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-zinc-500 mb-2">Scan QR Code</div>
            {generateQRPlaceholder()}
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <span className="text-lg">🐦</span>
              <span className="text-sm text-zinc-300">Twitter</span>
            </button>
            <button
              onClick={shareToFacebook}
              className="flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <span className="text-lg">📘</span>
              <span className="text-sm text-zinc-300">Facebook</span>
            </button>
            <button
              onClick={shareToLinkedIn}
              className="flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <span className="text-lg">💼</span>
              <span className="text-sm text-zinc-300">LinkedIn</span>
            </button>
            <button
              onClick={shareViaEmail}
              className="flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <span className="text-lg">📧</span>
              <span className="text-sm text-zinc-300">Email</span>
            </button>
          </div>

          {/* Copy Link */}
          <div>
            <div className="text-xs text-zinc-500 mb-2">Or copy link</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-400"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-cyan-500 text-black text-xs font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
