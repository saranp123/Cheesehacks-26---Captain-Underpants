import { Clock, Tag, ListTodo } from 'lucide-react'
import VolunteerList from './VolunteerList'

const STATUS_STYLES = {
  open: 'bg-emerald-100 text-emerald-800',
  claimed: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-amber-100 text-amber-800',
  completed: 'bg-slate-100 text-slate-600',
}

function getStatusLabel(status) {
  if (status === 'claimed' || status === 'in_progress') return 'In Progress'
  if (status === 'completed') return 'Completed'
  return 'Open'
}

export default function TaskListItem({
  opportunity,
  suggestedVolunteers,
  appliedVolunteers,
  onMessage,
  onNotify,
  onAccept,
  onDecline,
  onProfileClick,
}) {
  const status = opportunity.status || 'open'
  const statusClass = STATUS_STYLES[status] || STATUS_STYLES.open

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Opportunity details */}
        <div className="p-4 lg:p-5 shrink-0 min-w-0">
          <h3 className="font-semibold text-slate-800 mb-1.5 line-clamp-2">{opportunity.title}</h3>
          {opportunity.description && (
            <p className="text-sm text-slate-600 mb-2 line-clamp-4 leading-snug">
              {opportunity.description}
            </p>
          )}
          {opportunity.deliverables && (
            <p className="text-xs text-slate-500 mb-2 italic line-clamp-2">
              Deliverables: {opportunity.deliverables}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {opportunity.category}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${statusClass}`}
            >
              {getStatusLabel(status)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {(opportunity.required_skills || []).map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 text-xs text-slate-500"
              >
                <Tag size={10} /> {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-slate-500">
            <Clock size={14} />
            <span>{opportunity.timeEstimate || (opportunity.time_estimate ? `${opportunity.time_estimate} min` : '—')}</span>
          </div>
        </div>

        {/* Middle: Suggested volunteers */}
        <div className="p-4 lg:p-5 min-w-0">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <ListTodo size={12} /> Suggested volunteers
          </h4>
          <div className="max-h-48 overflow-y-auto">
            <VolunteerList
              volunteers={suggestedVolunteers}
              variant="suggested"
              onMessage={onMessage}
              onNotify={onNotify}
              onProfileClick={onProfileClick}
            />
          </div>
        </div>

        {/* Right: Applied volunteers */}
        <div className="p-4 lg:p-5 min-w-0">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            Applied volunteers
          </h4>
          <div className="max-h-48 overflow-y-auto">
            <VolunteerList
              volunteers={appliedVolunteers}
              variant="applied"
              onMessage={onMessage}
              onAccept={onAccept}
              onDecline={onDecline}
              onProfileClick={onProfileClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
