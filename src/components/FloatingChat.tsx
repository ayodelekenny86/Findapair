import { useState, useEffect, useRef } from 'react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

const botResponses: Record<string, string> = {
  'how it works': 'Simply post your solo item with a photo and description. Our AI match engine scans listings to find potential mates. You get notified instantly!',
  'pricing': 'We suggest pricing solo items at 30-50% of the original pair price. Our Smart Price Calculator shows you exactly how much buyers save.',
  'free items': 'The FreeItem Network is 100% free! List anything you don\'t need. Someone will claim it, often within hours.',
  'trust': 'Every member has a Trust Score based on successful transactions, response time, and community feedback.',
  'default': 'I can help with: how it works, pricing, free items, trust scores, or matching. Just ask! 🤖',
}

function getBotResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('how') || lower.includes('work')) return botResponses['how it works']
  if (lower.includes('price') || lower.includes('cost')) return botResponses['pricing']
  if (lower.includes('free') || lower.includes('give')) return botResponses['free items']
  if (lower.includes('trust') || lower.includes('safe')) return botResponses['trust']
  return botResponses['default']
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! 👋 I\'m FindBot. Ask me anything about FindAPair!', sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getBotResponse(input), sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)', boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)' }}
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] panel-elevated overflow-hidden animate-scale-in">
          <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
              <span className="text-sm">🤖</span>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-white">FindBot</h4>
              <div className="flex items-center gap-1.5">
                <span className="status-dot"></span>
                <span className="text-[10px] text-emerald-400">Online</span>
              </div>
            </div>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] ${
                  msg.sender === 'user' ? 'text-black' : 'text-zinc-300'
                }`} style={{
                  background: msg.sender === 'user' ? '#06b6d4' : 'rgba(255,255,255,0.05)',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 typing-dot"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 typing-dot"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
            />
            <button onClick={sendMessage} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#06b6d4' }}>
              <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
