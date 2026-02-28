import { MessageCircle, User } from 'lucide-react'

export default function MessageCard({ message, onSelect, isSelected }) {
  const { senderId, recipientId, message: text, read, createdAt } = message
  const date = createdAt ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <button
      type="button"
      onClick={() => onSelect?.(message)}
      className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 ${isSelected ? 'border-kindr-primary bg-kindr-primary/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
    >
      <div className="w-10 h-10 rounded-full bg-kindr-primary/20 flex items-center justify-center shrink-0">
        <User size={20} className="text-kindr-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-slate-800 truncate">{senderId}</span>
          <span className="text-xs text-slate-400 shrink-0">{date}</span>
        </div>
        <p className={`text-sm mt-0.5 truncate ${!read ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
          {text}
        </p>
      </div>
      {!read && <span className="w-2 h-2 rounded-full bg-kindr-primary shrink-0 mt-2" />}
    </button>
  )
}
