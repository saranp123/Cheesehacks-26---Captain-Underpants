import { useParams, useNavigate } from 'react-router-dom'
import { BLUEWAVE_ORG } from './profileData'
import { Clock, Tag, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const opportunity = BLUEWAVE_ORG.opportunities.find((o) => o.id === id)

  if (!opportunity) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/org/profile')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-4"
        >
          <ArrowLeft size={18} /> Back to profile
        </button>
        <p className="text-slate-500">Opportunity not found.</p>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/org/profile')}
        className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
      >
        <ArrowLeft size={18} /> Back to profile
      </button>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {opportunity.category}
          </span>
          <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-4">{opportunity.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {opportunity.timeEstimate || (opportunity.time_estimate ? `${opportunity.time_estimate} min` : '—')}
            </span>
            <div className="flex flex-wrap gap-2">
              {(opportunity.required_skills || []).map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-kindr-primary/10 text-kindr-primary text-xs">
                  <Tag size={12} /> {s}
                </span>
              ))}
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">{opportunity.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/org/feed"
              className="px-4 py-2 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
            >
              Apply via Org Feed
            </Link>
            <button
              type="button"
              onClick={() => navigate('/org/profile')}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              Back to profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
