import { Link } from 'react-router-dom'
import { Clock, MapPin, Tag } from 'lucide-react'

export default function OpportunityListItem({
  opportunity,
  matchPercentage = 0,
  onApply,
  onViewDetails,
}) {
  const {
    id,
    title,
    organizationName,
    organizationId,
    category,
    required_skills = [],
    timeEstimate,
    time_estimate,
    location,
    badges = [],
  } = opportunity

  const timeLabel = timeEstimate || (time_estimate != null ? `${time_estimate} min` : '—')
  const showRecommended = matchPercentage >= 70
  const showPopular = badges.some((b) => /popular|trending/i.test(String(b)))
  const showQuickTask = badges.some((b) => /quick/i.test(String(b)))

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-kindr-primary/40 hover:shadow-sm transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Primary info */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-lg text-slate-800">{title}</h3>
            {showRecommended && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-kindr-primary/15 text-kindr-primary font-medium">
                Recommended
              </span>
            )}
            {showPopular && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Popular
              </span>
            )}
            {showQuickTask && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Quick Task
              </span>
            )}
          </div>

          {organizationId && organizationName && (
            <p className="text-sm">
              <Link
                to={`/organization/${organizationId}`}
                className="text-kindr-primary hover:underline font-medium"
              >
                {organizationName}
              </Link>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
              {category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {required_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <Tag size={10} /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {timeLabel}
            </span>
            {location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} /> {location}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions + match */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Match</span>
            <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-kindr-primary transition-all"
                style={{ width: `${Math.min(100, matchPercentage)}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-800 w-10">
              {matchPercentage}%
            </span>
          </div>
          <div className="flex gap-2">
            {onApply && (
              <button
                type="button"
                onClick={() => onApply(id)}
                className="px-4 py-2 rounded-lg bg-kindr-primary text-white text-sm font-medium hover:bg-kindr-secondary transition"
              >
                Apply for Task
              </button>
            )}
            {onViewDetails && (
              <Link
                to={`/opportunity/${id}`}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-kindr-primary hover:bg-kindr-primary/5 transition inline-block text-center"
              >
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
