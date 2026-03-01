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
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Left: Primary info */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start gap-2">
            <h3 className="font-bold text-lg text-slate-900 leading-tight">{title}</h3>
            {showRecommended && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase tracking-wide">
                Recommended
              </span>
            )}
            {showPopular && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold uppercase tracking-wide">
                Popular
              </span>
            )}
            {showQuickTask && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold uppercase tracking-wide">
                Quick Task
              </span>
            )}
          </div>

          {organizationId && organizationName && (
            <p className="text-sm">
              <Link
                to={`/user/organization-profile/${organizationId === 'demo-org' ? 'kindr-demo' : organizationId}`}
                className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
              >
                {organizationName}
              </Link>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
              {category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {required_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
                >
                  <Tag size={12} /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600 pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} className="text-slate-400" /> <span className="font-medium">{timeLabel}</span>
            </span>
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} className="text-slate-400" /> <span className="font-medium">{location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions + match */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <div className="flex flex-col items-start gap-2 bg-blue-50 rounded-xl px-4 py-3 min-w-fit border border-blue-100">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Match Score</span>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden min-w-32 shadow-sm">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500 shadow-inner"
                  style={{ width: `${Math.min(100, matchPercentage)}%` }}
                />
              </div>
              <span className="text-lg font-bold text-blue-600 w-12 text-right tabular-nums">
                {matchPercentage}%
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {onApply && (
              <button
                type="button"
                onClick={() => onApply(id)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex-1 sm:flex-none"
              >
                Apply
              </button>
            )}
            {onViewDetails && (
              <Link
                to={`/opportunity/${id}`}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 inline-block text-center flex-1 sm:flex-none"
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
