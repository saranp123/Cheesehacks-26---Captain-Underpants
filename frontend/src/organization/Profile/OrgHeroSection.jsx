import { MapPin, ExternalLink, Users, Clock, ListTodo, BadgeCheck } from 'lucide-react'

function LogoPlaceholder() {
  return (
    <svg
      className="w-full h-full text-white"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="16" fill="currentColor" fillOpacity="0.9" />
      <path
        d="M20 50 L40 28 L60 50 L40 38 Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="40" cy="42" r="6" fill="white" />
    </svg>
  )
}

export default function OrgHeroSection({ org, onContact }) {
  const {
    name,
    tagline,
    location,
    website,
    totalVolunteers,
    totalHours,
    activeOpportunities,
    verified,
  } = org

  return (
    <section className="bg-gradient-to-br from-kindr-primary/10 via-white to-kindr-secondary/10 rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-kindr-primary overflow-hidden shrink-0 shadow-md">
            <LogoPlaceholder />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{name}</h1>
              {verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                  <BadgeCheck size={14} /> Verified Nonprofit
                </span>
              )}
            </div>
            {tagline && (
              <p className="text-slate-600 italic mb-3">{tagline}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={16} /> {location}
                </span>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-kindr-primary hover:underline"
                >
                  <ExternalLink size={16} /> Website
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <Users size={18} className="text-kindr-primary" />
                <strong>{totalVolunteers}</strong> Volunteers
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <Clock size={18} className="text-kindr-primary" />
                <strong>{totalHours}</strong> Hours
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <ListTodo size={18} className="text-kindr-primary" />
                <strong>{activeOpportunities}</strong> Active Opportunities
              </span>
            </div>
            {onContact && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onContact}
                  className="px-4 py-2 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
                >
                  Contact
                </button>
                <button
                  type="button"
                  onClick={onContact}
                  className="px-4 py-2 rounded-lg border border-kindr-primary text-kindr-primary font-medium hover:bg-kindr-primary/10 transition"
                >
                  Follow
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
