import { useState, useEffect, useRef } from 'react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

const botResponses: Record<string, string> = {
  'how it works': 'Simply post your solo item with a photo and description. Our AI match engine scans listings to find potential mates. You get notified instantly when a match is found!',
  'pricing': 'We suggest pricing solo items at 30-50% of the original pair price. Our Smart Price Calculator shows you exactly how much buyers save vs retail.',
  'free items': 'The FreeItem Network is 100% free! List anything you don\'t need — furniture, electronics, clothes, books. Someone will claim it, often within hours.',
  'trust': 'Every member has a Trust Score based on successful transactions, response time, and community feedback. Look for verified badges ✓ on listings.',
  'donation': 'When listing free items, you can opt for donation pickup. If unclaimed after 7 days, a non-profit will collect it. Zero waste guaranteed!',
  'match': 'Average match time is 48 hours! Our AI analyzes brand, size, material, color, and style. The more detail you provide, the better the match.',
  'default': 'I can help you with: how it works, pricing, free items, trust scores, donations, or matching. Just ask! 🤖',
}

function getBotResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('how') || lower.includes('work')) return botResponses['how it works']
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pay')) return botResponses['pricing']
  if (lower.includes('free') || lower.includes('give')) return botResponses['free items']
  if (lower.includes('trust') || lower.includes('safe') || lower.includes('scam')) return botResponses['trust']
  if (lower.includes('donat') || lower.includes('charity') || lower.includes('non-profit')) return botResponses['donation']
  if (lower.includes('match') || lower.includes('find') || lower.includes('pair')) return botResponses['match']
  return botResponses['default']
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! 👋 I\'m FindBot. Ask me anything about FindAPair — how it works, pricing, free items, and more!',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
      if (!isOpen) setUnread(prev => prev + 1)
    }, 1500)
  }

  const quickActions = ['How does it work?', 'Is it free?', 'How to find a match?']

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) setUnread(0); }}
        className="fixed bottom-6 right-20 z-40 w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-all group"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center notification-badge">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden shadow-2xl animate-scale-in border border-cyan-500/20">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">FindBot</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'chat-bubble sent' : 'chat-bubble'}`}>
                  <p className="text-sm text-slate-200">{msg.text}</p>
                  <p className="text-[10px] text-slate-600 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => { setInput(action); }}
                  className="px-3 py-1.5 glass-light rounded-full text-xs text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-cyan-500/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 outline-none"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl flex items-center justify-center hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
