import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/*
MessagingPage.jsx

User-to-Organization messaging interface
Features:
- Conversations with multiple organizations
- Rich organization data with logos
- Full chat history for each conversation
- Message sending and real-time updates
- Scrollable chat interface
*/

// Mock conversation data
const MOCK_USER_CONVERSATIONS = [
  {
    orgId: 'org_001',
    name: 'City Harvest Initiative',
    logo: 'https://via.placeholder.com/40?text=CH',
    task: 'Food Drive Coordination',
    status: 'active',
    lastMessage: 'Thanks for helping with the food drive!',
    timestamp: '2026-02-25T14:30:00Z',
    messages: [
      { sender: 'user', text: 'Hi! I\'m excited to help with the food drive.', time: '2026-02-24T10:00:00Z' },
      { sender: 'org', text: 'Great! We\'ll reserve a spot for you on Saturday.', time: '2026-02-24T10:15:00Z' },
      { sender: 'user', text: 'What time should I arrive?', time: '2026-02-24T15:45:00Z' },
      { sender: 'org', text: 'Please arrive by 9 AM at the warehouse. Bring comfortable shoes!', time: '2026-02-24T16:00:00Z' },
      { sender: 'user', text: 'Perfect! Thanks for the details.', time: '2026-02-25T08:30:00Z' },
      { sender: 'org', text: 'Thanks for helping with the food drive!', time: '2026-02-25T14:30:00Z' },
    ],
  },
  {
    orgId: 'org_002',
    name: 'GreenEarth Cleanup',
    logo: 'https://via.placeholder.com/40?text=GE',
    task: 'Park Cleanup - Downtown',
    status: 'active',
    lastMessage: 'See you at the park cleanup this Saturday!',
    timestamp: '2026-02-26T09:45:00Z',
    messages: [
      { sender: 'user', text: 'I can join the park cleanup on Saturday.', time: '2026-02-25T18:00:00Z' },
      { sender: 'org', text: 'Excellent! You\'re all set. We\'re meeting at Central Park, East Entrance.', time: '2026-02-25T18:15:00Z' },
      { sender: 'user', text: 'Got it. What should I bring?', time: '2026-02-26T08:00:00Z' },
      { sender: 'org', text: 'We\'ll provide gloves and bags. Just bring water and sunscreen!', time: '2026-02-26T08:15:00Z' },
      { sender: 'org', text: 'See you at the park cleanup this Saturday!', time: '2026-02-26T09:45:00Z' },
    ],
  },
  {
    orgId: 'org_003',
    name: 'TutorTime Initiative',
    logo: 'https://via.placeholder.com/40?text=TT',
    task: 'After-School Tutoring',
    status: 'active',
    lastMessage: 'Don\'t forget your tutoring session tomorrow.',
    timestamp: '2026-02-27T12:00:00Z',
    messages: [
      { sender: 'org', text: 'Welcome to TutorTime! Your first session is on Monday at 3:30 PM.', time: '2026-02-24T14:00:00Z' },
      { sender: 'user', text: 'Thanks! I\'m ready to start. What grade level will I be teaching?', time: '2026-02-24T14:30:00Z' },
      { sender: 'org', text: 'You\'ll be working with 4th and 5th graders on math fundamentals.', time: '2026-02-24T15:00:00Z' },
      { sender: 'user', text: 'Perfect! That\'s my strength. See you Monday!', time: '2026-02-24T15:15:00Z' },
      { sender: 'org', text: 'Don\'t forget your tutoring session tomorrow.', time: '2026-02-27T12:00:00Z' },
    ],
  },
]

export default function MessagingPage() {
  const { profile } = useAuth()
  const [conversations, setConversations] = useState(
    MOCK_USER_CONVERSATIONS.reduce((acc, conv) => {
      acc[conv.orgId] = conv.messages
      return acc
    }, {})
  )
  const [conversationData, setConversationData] = useState(MOCK_USER_CONVERSATIONS)
  const [selected, setSelected] = useState(MOCK_USER_CONVERSATIONS[0].orgId)
  const [input, setInput] = useState('')
  const [unread, setUnread] = useState(() => {
    const map = {}
    MOCK_USER_CONVERSATIONS.forEach(conv => {
      const msgs = conv.messages || []
      const last = msgs[msgs.length - 1]
      map[conv.orgId] = last && last.sender === 'org' ? true : false
    })
    return map
  })

  const messagesEndRef = useRef(null)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    setUnread(prev => ({ ...prev, [selected]: false }))
  }, [selected])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, selected])

  function formatTime(isoString) {
    const date = new Date(isoString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const isToday = date.toDateString() === today.toDateString()
    const isYesterday = date.toDateString() === yesterday.toDateString()

    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (isYesterday) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  function formatNow() {
    const d = new Date()
    return d.toISOString()
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const newMsg = { sender: 'user', text, time: formatNow() }
    setConversations(prev => ({ ...prev, [selected]: [...(prev[selected] || []), newMsg] }))
    
    // Update conversation data with latest message
    setConversationData(prev => 
      prev.map(conv => 
        conv.orgId === selected 
          ? { ...conv, lastMessage: text, timestamp: formatNow() }
          : conv
      )
    )
    setInput('')
  }

  const selectedConv = conversationData.find(c => c.orgId === selected)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">Stay connected with organizations about your volunteering</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row overflow-hidden min-h-[600px]">
          {/* Left Sidebar: Conversations */}
          <aside className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 flex items-center gap-2">
                <MessageCircle size={16} />
                Conversations
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {conversationData.map(conv => {
                const active = selected === conv.orgId
                return (
                  <button
                    key={conv.orgId}
                    onClick={() => setSelected(conv.orgId)}
                    className={`w-full text-left p-4 hover:bg-white transition-all duration-200 flex items-start gap-3 ${
                      active ? 'bg-white border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <img
                      src={conv.logo}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-slate-900 truncate">{conv.name}</p>
                        {unread[conv.orgId] && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 truncate mb-1">{conv.task}</p>
                      <p className="text-xs text-slate-500 truncate mb-2">{conv.lastMessage}</p>
                      <p className="text-xs text-slate-400 font-medium">{formatTime(conv.timestamp)}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Right Panel: Chat */}
          {selectedConv && (
            <main className="flex-1 flex flex-col bg-white">
              {/* Header */}
              <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConv.logo}
                    alt={selectedConv.name}
                    className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-slate-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{selectedConv.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{selectedConv.task}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    selectedConv.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selectedConv.status === 'active' ? '● Active' : '○ Pending'}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {(conversations[selected] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-sm px-5 py-3 rounded-2xl shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-900 rounded-bl-none'
                      }`}
                    >
                      <p className="break-words text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`text-xs mt-2 font-medium ${
                          msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {formatTime(msg.time)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-5 border-t border-slate-200 bg-white">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    onClick={handleSend}
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}
