import { useState, useEffect } from 'react'
import MessageCard from '../components/MessageCard'
import { useAuth } from '../context/AuthContext'

const MOCK_MESSAGES = [
  { id: 'm1', senderId: 'org1', senderName: 'Happy Paws', recipientId: 'u1', message: 'Thanks for claiming the social media task!', read: false, createdAt: new Date().toISOString() },
  { id: 'm2', senderId: 'org1', senderName: 'Happy Paws', recipientId: 'u1', message: 'Your flyer design was approved. Great work!', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
]

export default function MessagingPage() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [selected, setSelected] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (apiUrl && profile?.id) {
      fetch(`${apiUrl}/notifications/${profile.id}`)
        .then(res => res.ok ? res.json() : [])
        .then(list => setMessages(prev => (list.length ? list.map(n => ({ id: n.id, senderId: n.userId, message: n.body, read: n.read, createdAt: n.createdAt })) : prev)))
        .catch(() => {})
    }
  }, [apiUrl, profile?.id])

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Messages & notifications</h1>
      <p className="text-slate-500 mb-6">Task suggestions, approvals, and messages from organizations</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-2">
          {messages.map(msg => (
            <MessageCard
              key={msg.id}
              message={msg}
              onSelect={setSelected}
              isSelected={selected?.id === msg.id}
            />
          ))}
        </div>
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="font-medium text-slate-800">{selected.senderName || selected.senderId}</span>
                <span className="text-sm text-slate-400">
                  {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ''}
                </span>
              </div>
              <p className="text-slate-600 whitespace-pre-wrap">{selected.message}</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
