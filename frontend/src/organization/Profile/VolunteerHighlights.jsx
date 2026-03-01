import { Link } from 'react-router-dom'
import { Clock, User } from 'lucide-react'

export default function VolunteerHighlights({ featuredVolunteers }) {
  if (!featuredVolunteers || featuredVolunteers.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Volunteer highlights</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {featuredVolunteers.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-kindr-primary/40 transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-kindr-primary/20 flex items-center justify-center shrink-0">
                <User size={24} className="text-kindr-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">{v.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock size={12} /> {v.hoursContributed} hours contributed
                </p>
                {v.quote && (
                  <p className="text-sm text-slate-600 mt-2 italic">&ldquo;{v.quote}&rdquo;</p>
                )}
                <Link
                  to={`/volunteer/${v.id}`}
                  className="inline-block mt-2 text-sm font-medium text-kindr-primary hover:underline"
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
