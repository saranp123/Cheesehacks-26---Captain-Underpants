import { Link } from 'react-router-dom'
import { Clock, Tag, ArrowRight } from 'lucide-react'

export default function OrgOpportunitiesSection({ opportunities, orgId = 'bluewave' }) {
  if (!opportunities || opportunities.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Current opportunities</h2>
        <p className="text-slate-500">No active opportunities right now. Check back soon.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Current volunteering opportunities</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp) => (
          <Link
            key={opp.id}
            to={`/org/opportunity/${opp.id}`}
            className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-kindr-primary/50 hover:shadow-md transition text-left"
          >
            <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{opp.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {opp.category}
            </span>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">{opp.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {(opp.required_skills || []).map((s) => (
                <span key={s} className="text-xs text-slate-500 flex items-center gap-0.5">
                  <Tag size={10} /> {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={12} /> {opp.timeEstimate || (opp.time_estimate ? `${opp.time_estimate} min` : '—')}
              </span>
              <span className="text-xs font-medium text-kindr-primary flex items-center gap-1">
                View details <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
