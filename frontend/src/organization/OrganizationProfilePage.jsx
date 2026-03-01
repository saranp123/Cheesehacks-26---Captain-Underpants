import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, ExternalLink, Users, Clock, ListTodo, BadgeCheck } from 'lucide-react'
import { getOrg, getOpportunities, normalizeOpportunity } from '../api/client'

function LogoPlaceholder() {
  return (
    <svg className="w-full h-full text-white" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="currentColor" fillOpacity="0.9" />
      <path d="M20 50 L40 28 L60 50 L40 38 Z" fill="white" fillOpacity="0.95" />
      <circle cx="40" cy="42" r="6" fill="white" />
    </svg>
  )
}

export default function OrganizationProfilePage() {
  const { id } = useParams()
  const [org, setOrg] = useState(null)
  const [opportunities, setOpportunities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }
    let cancelled = false
    setError(null)
    Promise.all([getOrg(id), getOpportunities()])
      .then(([orgData, oppsData]) => {
        if (cancelled) return
        setOrg(orgData ?? null)
        const list = Array.isArray(oppsData) ? oppsData.map(normalizeOpportunity).filter(Boolean) : []
        const filtered = list.filter((opp) => opp.orgId === id || opp.organizationId === id)
        setOpportunities(filtered)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load organization')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-500 py-8">Loading organization…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-red-600 py-4">{error}</p>
        <Link to="/feed" className="text-kindr-primary hover:underline">Back to feed</Link>
      </div>
    )
  }

  if (!org) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-500 py-8">Organization not found.</p>
        <Link to="/feed" className="text-kindr-primary hover:underline">Back to feed</Link>
      </div>
    )
  }

  // Defensive fallback for all org fields
  const orgName = org?.name || '—';
  const focusAreas = Array.isArray(org?.focusAreas) ? org.focusAreas : [];
  const totalVolunteers = org?.totalVolunteers ?? '—';
  const totalHours = org?.totalHours ?? '—';
  const tasksCompleted = org?.tasksCompleted ?? '—';
  const tagline = org?.tagline || '';
  const location = org?.location || '';
  const website = org?.website || '';
  const verified = !!org?.verified;
  const description = org?.description || org?.mission || 'No description available.';
  const testimonials = Array.isArray(org?.testimonials) ? org.testimonials : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kindr-primary/10 via-white to-kindr-secondary/10 rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-kindr-primary overflow-hidden shrink-0 shadow-md">
              <LogoPlaceholder />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{orgName}</h1>
                {/* Only show Verified badge if org.verified is true */}
                {verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                    <BadgeCheck size={14} /> Verified Nonprofit
                  </span>
                )}
              </div>
              {/* Only show tagline/location/website if present */}
              {tagline && <p className="text-slate-600 italic mb-3">{tagline}</p>}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={16} /> {location}
                  </span>
                )}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-kindr-primary hover:underline">
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
                  <strong>{opportunities.length}</strong> Active Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & focus areas */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">About</h2>
        <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
        {focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {focusAreas.map((area) => (
              <span key={area} className="px-2 py-1 rounded-lg bg-kindr-primary/10 text-kindr-primary text-sm">
                {area}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Impact stats */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Impact</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-kindr-primary">{totalVolunteers}</p>
            <p className="text-sm text-slate-600">Total Volunteers</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-kindr-primary">{totalHours}</p>
            <p className="text-sm text-slate-600">Volunteer Hours</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-kindr-primary">{tasksCompleted}</p>
            <p className="text-sm text-slate-600">Tasks Completed</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-kindr-primary">{opportunities.length}</p>
            <p className="text-sm text-slate-600">Posted Opportunities</p>
          </div>
        </div>
      </section>

      {/* Posted opportunities */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Posted opportunities</h2>
        {opportunities.length === 0 ? (
          <p className="text-slate-500">No opportunities posted yet.</p>
        ) : (
          <ul className="space-y-2">
            {opportunities.map((opp) => (
              <li key={opp.id}>
                <Link
                  to={`/opportunity/${opp.id}`}
                  className="block p-3 rounded-lg border border-slate-200 hover:border-kindr-primary/40 hover:bg-kindr-primary/5 transition"
                >
                  <span className="font-medium text-slate-800">{opp.title}</span>
                  <span className="text-sm text-slate-500 ml-2">
                    {opp.timeEstimate || (opp.time_estimate ? `${opp.time_estimate} min` : '')} {opp.category ? `· ${opp.category}` : ''}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Testimonials only if present */}
      {testimonials.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Volunteer testimonials</h2>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="pl-4 border-l-4 border-kindr-primary/30 text-slate-600 italic">
                &ldquo;{t.quote || ''}&rdquo; — {t.name || 'Anonymous'}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/feed"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
        >
          Back to feed
        </Link>
      </div>
    </div>
  )
}
