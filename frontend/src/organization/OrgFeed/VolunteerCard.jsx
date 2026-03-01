import { MessageCircle, Bell, UserCheck, UserX } from 'lucide-react'

export default function VolunteerCard({
  volunteer,
  variant,
  onMessage,
  onNotify,
  onAccept,
  onDecline,
  onProfileClick,
}) {
  const { name, skills = [], availability, tasksCompleted = 0, timeCommitment } = volunteer

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 hover:border-slate-300 transition">
      <button
        type="button"
        onClick={() => onProfileClick?.(volunteer)}
        className="w-full text-left group"
      >
        <p className="font-medium text-slate-800 group-hover:text-kindr-primary truncate">{name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {skills.slice(0, 3).join(', ')}{skills.length > 3 ? '…' : ''}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {availability} · {tasksCompleted} tasks
        </p>
        {timeCommitment && (
          <p className="text-xs text-kindr-primary/90 mt-0.5 font-medium">
            Time: {timeCommitment}
          </p>
        )}
      </button>
      <div className="flex flex-wrap gap-1 mt-2">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onMessage?.(volunteer) }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-kindr-primary/10 text-kindr-primary hover:bg-kindr-primary hover:text-white transition"
        >
          <MessageCircle size={12} /> Message
        </button>
        {variant === 'suggested' && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNotify?.(volunteer) }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
          >
            <Bell size={12} /> Notify
          </button>
        )}
        {variant === 'applied' && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onAccept?.(volunteer) }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-100 text-green-800 hover:bg-green-200 transition"
            >
              <UserCheck size={12} /> Accept
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDecline?.(volunteer) }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              <UserX size={12} /> Decline
            </button>
          </>
        )}
      </div>
    </div>
  )
}
