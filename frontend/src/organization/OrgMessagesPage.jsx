import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle, Users, CheckCircle, Send, MessageSquare } from 'lucide-react'

/*
OrgMessagesPage.jsx

Enhanced messaging UI for organizations to chat with volunteers.
Features:
- Conversations with rich volunteer data
- Chat history with realistic timestamps
- Suggested volunteers for opportunities
- Applied volunteers for open tasks
- Message input with send functionality
*/

// Mock conversation data
const MOCK_CONVERSATIONS = [
  {
    volunteerId: 'v_101',
    name: 'Saran P.',
    avatar: 'https://via.placeholder.com/40?text=SP',
    skills: ['Tutoring', 'Communication'],
    availability: 'Weekends',
    status: 'active',
    messages: [
      { sender: 'volunteer', text: 'Hi! Can I help with the park cleanup?', time: '2026-02-24T14:00:00Z' },
      { sender: 'org', text: 'Absolutely! We\'ll reserve a spot for you.', time: '2026-02-24T14:15:00Z' },
      { sender: 'volunteer', text: 'Great! What time should I arrive?', time: '2026-02-24T15:30:00Z' },
      { sender: 'org', text: 'We start at 9 AM at Central Park. Bring gloves if you have them!', time: '2026-02-24T15:45:00Z' },
      { sender: 'volunteer', text: 'Looking forward to helping this weekend!', time: '2026-02-25T10:15:00Z' },
    ],
    lastMessage: 'Looking forward to helping this weekend!',
    timestamp: '2026-02-25T10:15:00Z',
  },
  {
    volunteerId: 'v_102',
    name: 'Alex T.',
    avatar: 'https://via.placeholder.com/40?text=AT',
    skills: ['Social Media', 'Writing'],
    availability: 'Evenings',
    status: 'active',
    messages: [
      { sender: 'volunteer', text: 'I have a question about the tutoring task.', time: '2026-02-26T09:30:00Z' },
      { sender: 'org', text: 'Sure! What do you need to know?', time: '2026-02-26T09:45:00Z' },
      { sender: 'volunteer', text: 'What grade level should I focus on?', time: '2026-02-26T10:00:00Z' },
      { sender: 'org', text: 'We have students from grades 3-5. You can choose your preference!', time: '2026-02-26T10:10:00Z' },
    ],
    lastMessage: 'You can choose your preference!',
    timestamp: '2026-02-26T10:10:00Z',
  },
  {
    volunteerId: 'v_103',
    name: 'Jamie L.',
    avatar: 'https://via.placeholder.com/40?text=JL',
    skills: ['Event Planning', 'Organization'],
    availability: 'Flexible',
    status: 'pending',
    messages: [
      { sender: 'volunteer', text: 'Hi! I saw your fundraiser event. I\'d love to help.', time: '2026-02-27T08:15:00Z' },
      { sender: 'org', text: 'Wonderful! We need help with setup and coordination.', time: '2026-02-27T08:30:00Z' },
      { sender: 'volunteer', text: 'Can\'t make it this weekend, sorry! But maybe next month?', time: '2026-02-27T12:00:00Z' },
      { sender: 'org', text: 'No worries! We\'ll keep you in mind for next week.', time: '2026-02-27T12:10:00Z' },
    ],
    lastMessage: 'We\'ll keep you in mind for next week.',
    timestamp: '2026-02-27T12:10:00Z',
  },
]

// Mock suggested volunteers
const MOCK_SUGGESTED_VOLUNTEERS = [
  {
    id: 's_201',
    name: 'Emma R.',
    avatar: 'https://via.placeholder.com/40?text=ER',
    skills: ['Education', 'Mentoring'],
    availability: 'Weekdays - 2 hours/week',
    fit: 'Perfect match for tutoring task',
  },
  {
    id: 's_202',
    name: 'Marcus J.',
    avatar: 'https://via.placeholder.com/40?text=MJ',
    skills: ['Environmental', 'Outdoor Work'],
    availability: 'Weekends - 4 hours/week',
    fit: 'Great for park cleanup',
  },
  {
    id: 's_203',
    name: 'Lisa Chen',
    avatar: 'https://via.placeholder.com/40?text=LC',
    skills: ['Social Media', 'Digital Marketing'],
    availability: 'Flex - 3 hours/week',
    fit: 'Ideal for social campaign',
  },
]

// Mock applied volunteers
const MOCK_APPLIED_VOLUNTEERS = [
  {
    id: 'a_301',
    name: 'Chris P.',
    avatar: 'https://via.placeholder.com/40?text=CP',
    taskApplied: 'Community Cleanup',
    timeCommitment: '2–3 hours/week',
    appliedDate: '2026-02-27',
  },
  {
    id: 'a_302',
    name: 'Nina M.',
    avatar: 'https://via.placeholder.com/40?text=NM',
    taskApplied: 'Fund Raiser Support',
    timeCommitment: '4–5 hours/week',
    appliedDate: '2026-02-26',
  },
]

export default function OrgMessagesPage() {
  const location = useLocation()
  const [conversations, setConversations] = useState(
    MOCK_CONVERSATIONS.reduce((acc, conv) => {
      acc[conv.volunteerId] = conv.messages
      return acc
    }, {})
  )
  const [conversationData, setConversationData] = useState(MOCK_CONVERSATIONS)
  
  // Initialize selected based on passed state or default to first
  const initialSelected = location.state?.volunteerId || location.state?.recipientId || MOCK_CONVERSATIONS[0].volunteerId
  const [selected, setSelected] = useState(initialSelected)
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('conversations')
  const [unread, setUnread] = useState(() => {
    const map = {}
    MOCK_CONVERSATIONS.forEach(conv => {
      const msgs = conv.messages || []
      const last = msgs[msgs.length - 1]
      map[conv.volunteerId] = last && last.sender === 'volunteer' ? true : false
    })
    return map
  })


  const messagesEndRef = useRef(null)

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
    const newMsg = { sender: 'org', text, time: formatNow() }
    setConversations(prev => ({ ...prev, [selected]: [...(prev[selected] || []), newMsg] }))
    
    // Update conversation data with latest message
    setConversationData(prev => 
      prev.map(conv => 
        conv.volunteerId === selected 
          ? { ...conv, lastMessage: text, timestamp: formatNow() }
          : conv
      )
    )
    setInput('')
  }

  const getConversationInfo = (volunteerId) => conversationData.find(c => c.volunteerId === volunteerId)
  const selectedConv = getConversationInfo(selected)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Organization Messaging</h1>
        <p className="text-slate-500">Manage conversations with volunteers and find new candidates</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row overflow-hidden min-h-96">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 sticky top-0 bg-white z-10">
            <button
              onClick={() => setActiveTab('conversations')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'conversations'
                  ? 'border-kindr-primary text-kindr-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              <MessageCircle size={16} className="inline mr-2" />
              Conversations
            </button>
            <button
              onClick={() => setActiveTab('suggested')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'suggested'
                  ? 'border-kindr-primary text-kindr-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Suggested
            </button>
            <button
              onClick={() => setActiveTab('applied')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'applied'
                  ? 'border-kindr-primary text-kindr-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              <CheckCircle size={16} className="inline mr-2" />
              Applied
            </button>
          </div>

          {/* Conversations Tab */}
          {activeTab === 'conversations' && (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {conversationData.map(conv => {
                const active = selected === conv.volunteerId
                return (
                  <button
                    key={conv.volunteerId}
                    onClick={() => setSelected(conv.volunteerId)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition flex items-start gap-3 ${
                      active ? 'bg-kindr-primary/5' : ''
                    }`}
                  >
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-medium text-slate-900 truncate">{conv.name}</p>
                        {unread[conv.volunteerId] && (
                          <div className="w-3 h-3 rounded-full bg-rose-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatTime(conv.timestamp)}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Suggested Volunteers Tab */}
          {activeTab === 'suggested' && (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-4 space-y-4">
              {MOCK_SUGGESTED_VOLUNTEERS.map(vol => (
                <div key={vol.id} className="pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={vol.avatar}
                      alt={vol.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{vol.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {vol.skills.map(skill => (
                          <span
                            key={skill}
                            className="text-xs bg-kindr-primary/10 text-kindr-primary px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 mt-2">{vol.availability}</p>
                      <p className="text-xs text-slate-500 italic mt-1">{vol.fit}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg border border-kindr-primary text-kindr-primary hover:bg-kindr-primary/5 text-xs font-medium transition">
                      Message
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-kindr-primary text-white hover:bg-kindr-secondary text-xs font-medium transition">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Applied Volunteers Tab */}
          {activeTab === 'applied' && (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-4 space-y-4">
              {MOCK_APPLIED_VOLUNTEERS.map(vol => (
                <div key={vol.id} className="pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={vol.avatar}
                      alt={vol.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{vol.name}</p>
                      <p className="text-sm text-slate-700 font-medium mt-1">{vol.taskApplied}</p>
                      <p className="text-xs text-slate-600 mt-1">⏱️ {vol.timeCommitment}</p>
                      <p className="text-xs text-slate-400 mt-2">Applied: {vol.appliedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition">
                      Message
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-medium transition">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Panel: Chat */}
        {activeTab === 'conversations' && selectedConv && (
          <main className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 to-white">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConv.avatar}
                  alt={selectedConv.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{selectedConv.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedConv.skills.join(', ')} • {selectedConv.availability}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedConv.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {selectedConv.status === 'active' ? '🟢 Active' : '⏱️ Pending'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {(conversations[selected] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'org' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'org'
                        ? 'bg-kindr-primary text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-900 rounded-bl-none'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === 'org' ? 'text-blue-100' : 'text-slate-500'
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
            <div className="p-4 border-t border-slate-100 bg-white">
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
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-kindr-primary focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
