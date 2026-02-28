import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { getNotifications, subscribeToNotifications } from '../utils/notifications'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return subscribeToNotifications(setNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-kindr-primary"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" aria-hidden onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-80 max-h-96 overflow-auto bg-white rounded-xl border border-slate-200 shadow-lg z-20 py-2">
            <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center">
              <span className="font-semibold text-slate-800">Notifications</span>
              <Link to="/messages" className="text-sm text-kindr-primary hover:underline" onClick={() => setOpen(false)}>
                View all
              </Link>
            </div>
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-slate-500 text-sm">No notifications yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {notifications.slice(0, 5).map(n => (
                  <li key={n.id} className={`px-4 py-3 text-sm ${!n.read ? 'bg-kindr-primary/5' : ''}`}>
                    <p className="font-medium text-slate-800">{n.title || 'Notification'}</p>
                    <p className="text-slate-600 mt-0.5">{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}
