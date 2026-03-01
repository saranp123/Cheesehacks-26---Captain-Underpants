import { useEffect, useState, useRef } from 'react'

/*
OrgMessagesPage.js

Simple in-frontend messaging UI for organizations to chat with volunteers.
Data is mocked locally (no backend). Structure:

volunteers: [ { id, name } ]
messages: { [volunteerId]: [ { sender: 'volunteer'|'org', text, timestamp } ] }

This component implements:
- Left sidebar with conversation list, last message preview, unread badge
- Right panel with chat history and input to send new messages
- Messages by org are aligned right; volunteer messages aligned left
*/

export default function OrgMessagesPage() {
  // Mock volunteers
  const volunteers = [
    { id: 'v1', name: 'Saran P.' },
    { id: 'v2', name: 'Alex T.' },
    { id: 'v3', name: 'Jamie L.' },
  ]

  // Initial mock messages
  const initialMessages = {
    v1: [
      { sender: 'volunteer', text: 'Hi, is the task still open?', timestamp: '2026-02-28 10:15' },
      { sender: 'org', text: 'Yes! You can claim it anytime today.', timestamp: '2026-02-28 10:17' },
    ],
    v2: [
      { sender: 'volunteer', text: 'Can I help with the community cleanup?', timestamp: '2026-02-27 14:30' },
      { sender: 'org', text: 'Absolutely! You are added to the task.', timestamp: '2026-02-27 14:32' },
    ],
    v3: [
      { sender: 'volunteer', text: 'Do you need extra hands for the fundraiser?', timestamp: '2026-02-26 09:00' },
      { sender: 'org', text: 'Yes, please join our volunteer list.', timestamp: '2026-02-26 09:05' },
    ],
  }

  const [conversations, setConversations] = useState(initialMessages)
  const [selected, setSelected] = useState(volunteers[0].id)
  const [input, setInput] = useState('')
  const [unread, setUnread] = useState(() => {
    // mark unread if the last message is from volunteer
    const map = {}
    for (const v of volunteers) {
      const msgs = initialMessages[v.id] || []
      const last = msgs[msgs.length - 1]
      map[v.id] = last && last.sender === 'volunteer'
    }
    return map
  })

  const listRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // when selecting a conversation, clear unread for that volunteer
    setUnread(prev => ({ ...prev, [selected]: false }))
  }, [selected])

  useEffect(() => {
    // auto-scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, selected])

  function formatNow() {
    const d = new Date()
    const YYYY = d.getFullYear()
    const MM = String(d.getMonth() + 1).padStart(2, '0')
    const DD = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}`
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const newMsg = { sender: 'org', text, timestamp: formatNow() }
    setConversations(prev => ({ ...prev, [selected]: [...(prev[selected] || []), newMsg] }))
    setInput('')
  }

  // helper for preview text
  const lastMessagePreview = (id) => {
    const msgs = conversations[id] || []
    const last = msgs[msgs.length - 1]
    return last ? `${last.sender === 'org' ? 'You: ' : ''}${last.text.slice(0, 40)}` : 'No messages yet'
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Organization Messaging</h1>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden">
        {/* Left sidebar: conversations */}
        <aside className="w-80 border-r border-slate-100">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Conversations</h2>
          </div>
          <div className="divide-y divide-slate-100" ref={listRef}>
            {volunteers.map(v => {
              const active = selected === v.id
              return (
                <button
                  key={v.id}
                  onClick={() => setSelected(v.id)}
                  className={`w-full text-left p-4 flex items-start gap-3 hover:bg-slate-50 ${active ? 'bg-kindr-primary/5' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-kindr-primary/20 flex items-center justify-center text-sm font-semibold text-kindr-primary">{v.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium text-slate-800">{v.name}</div>
                      {unread[v.id] && (
                        <div className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">New</div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{lastMessagePreview(v.id)}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Right panel: active conversation */}
        <main className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{volunteers.find(x => x.id === selected)?.name}</h3>
                <p className="text-xs text-slate-500">Messaging with volunteer</p>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto" style={{ minHeight: 240 }}>
            <div className="flex flex-col gap-4">
              {(conversations[selected] || []).map((m, idx) => (
                <div key={idx} className={`max-w-xl ${m.sender === 'org' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                  <div className={`${m.sender === 'org' ? 'bg-kindr-primary text-white' : 'bg-slate-100 text-slate-800'} inline-block px-4 py-2 rounded-xl`}>{m.text}</div>
                  <div className="text-xs text-slate-400 mt-1">{m.timestamp}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary"
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
