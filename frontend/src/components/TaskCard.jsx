import { Clock, Tag, Users, CheckCircle } from 'lucide-react'

export default function TaskCard({ task, userSkills = [], onClaim, onComplete, showOrg = false, assignedCount = 0, fitScore = null }) {
  const matchCount = (task.required_skills || []).filter(s => userSkills.includes(s)).length
  const matchLabel = matchCount === (task.required_skills || []).length ? 'Full match' : `${matchCount}/${(task.required_skills || []).length} skills`
  const isClaimed = (task.assigned_users || []).length > 0

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-lg text-slate-800">{task.title}</h3>
          {fitScore !== null && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Fit {Math.round(fitScore)}</span>
          )}
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-kindr-primary/10 text-kindr-primary whitespace-nowrap">
          {task.category}
        </span>
      </div>
      <p className="text-slate-600 text-sm mt-2 line-clamp-2">{task.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {(task.required_skills || []).map(skill => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
            <Tag size={12} /> {skill}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {task.timeEstimate || (task.time_estimate ? `${task.time_estimate} min` : '—')}
          </span>
          {(task.badges || []).length > 0 && (
            <span className="flex flex-wrap gap-1">
              {(task.badges || []).slice(0, 3).map(b => (
                <span key={b} className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">{b}</span>
              ))}
            </span>
          )}
          {showOrg && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {assignedCount} volunteer(s)
            </span>
          )}
          {userSkills.length > 0 && (
            <span className={matchCount > 0 ? 'text-green-600' : 'text-slate-500'}>{matchLabel}</span>
          )}
        </div>
        <div className="flex gap-2">
          {onClaim && !isClaimed && (
            <button
              onClick={() => onClaim(task.id)}
              className="px-3 py-1.5 rounded-lg bg-kindr-primary text-white text-sm font-medium hover:bg-kindr-secondary transition"
            >
              Claim
            </button>
          )}
          {onComplete && isClaimed && (
            <button
              onClick={() => onComplete(task.id)}
              className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 flex items-center gap-1"
            >
              <CheckCircle size={14} /> Complete
            </button>
          )}
        </div>
      </div>
      {showOrg && task.organizationName && (
        <p className="text-xs text-slate-400 mt-2">Posted by {task.organizationName}</p>
      )}
    </div>
  )
}
