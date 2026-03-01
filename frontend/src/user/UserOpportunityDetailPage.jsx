import { useParams, useNavigate, Link } from 'react-router-dom'
import { Clock, Tag, MapPin, ArrowLeft } from 'lucide-react'
import { PLACEHOLDER_TASKS } from '../data/placeholders'

export default function UserOpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const opportunity = PLACEHOLDER_TASKS.find((t) => t.id === id)

  if (!opportunity) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/feed')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-4"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <p className="text-slate-500">Opportunity not found.</p>
      </div>
    )
  }

  const { title, description, deliverables, category, required_skills, timeEstimate, time_estimate, location, organizationName, organizationId } = opportunity
  const timeLabel = timeEstimate || (time_estimate != null ? `${time_estimate} min` : '—')

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/feed')}
        className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
      >
        <ArrowLeft size={18} /> Back to feed
      </button>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6 md:p-8">
        <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">{category}</span>
        <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-2">{title}</h1>
        {organizationId && organizationName && (
          <p className="text-sm mb-4">
            <Link to={`/organization/${organizationId}`} className="text-kindr-primary hover:underline font-medium">
              {organizationName}
            </Link>
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
          <span className="inline-flex items-center gap-1">
            <Clock size={16} /> {timeLabel}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={16} /> {location}
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {(required_skills || []).map((s) => (
              <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-kindr-primary/10 text-kindr-primary text-xs">
                <Tag size={12} /> {s}
              </span>
            ))}
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
        {deliverables && (
          <p className="text-sm text-slate-500 italic mb-6">Deliverables: {deliverables}</p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
          >
            Apply for Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/feed')}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            Back to feed
          </button>
        </div>
      </div>
    </div>
  )
}
