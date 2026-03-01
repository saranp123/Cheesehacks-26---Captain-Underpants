import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PLACEHOLDER_VOLUNTEERS } from '../data/placeholders'
import { getFeaturedVolunteer } from './profileData'
import { getUser, normalizeUser } from '../api/client'
import { MessageCircle, ArrowLeft, Clock, Award, User } from 'lucide-react'

export default function VolunteerProfileView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [volunteer, setVolunteer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const featured = getFeaturedVolunteer(id)
  const placeholderVolunteer = PLACEHOLDER_VOLUNTEERS.find((v) => v.id === id)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }
    let cancelled = false
    setError(null)
    getUser(id)
      .then((data) => {
        if (!cancelled && data) setVolunteer(normalizeUser(data) ?? data)
      })
      .catch(() => {
        if (!cancelled) setVolunteer(placeholderVolunteer ?? null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  const displayVolunteer = volunteer ?? placeholderVolunteer

  if (isLoading) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/org/feed')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <p className="text-slate-500">Loading volunteer…</p>
      </div>
    )
  }

  if (!displayVolunteer && !featured) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/org/feed')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-4"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <p className="text-slate-500">Volunteer not found.</p>
      </div>
    )
  }

  if (featured && !displayVolunteer) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-kindr-primary/20 flex items-center justify-center shrink-0">
              <User size={28} className="text-kindr-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">{featured.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{featured.hoursContributed} hours contributed</p>
              {featured.quote && (
                <p className="text-slate-600 mt-3 italic">&ldquo;{featured.quote}&rdquo;</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { name, skills = [], availability, timeCommitment, tasksCompleted = 0, volunteer_hours = 0, badges = [] } = displayVolunteer

  return (
    <div>
      {error && (
        <p className="mb-4 py-3 px-4 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-sm">{error}</p>
      )}
      <button
        type="button"
        onClick={() => navigate('/org/feed')}
        className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
      >
        <ArrowLeft size={18} /> Back to feed
      </button>
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap gap-6">
          <div className="w-16 h-16 rounded-full bg-kindr-primary/20 flex items-center justify-center text-2xl font-semibold text-kindr-primary">
            {(name || '?').charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock size={16} /> {availability ?? '—'} · {timeCommitment || '—'}
              </span>
              <span>{tasksCompleted} tasks · {volunteer_hours} hrs</span>
            </div>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => navigate('/messages')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-kindr-primary text-white hover:bg-kindr-secondary transition"
            >
              <MessageCircle size={18} /> Message
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Award size={18} /> Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-kindr-primary/10 text-kindr-primary text-sm">
                {s}
              </span>
            ))}
            {skills.length === 0 && <p className="text-slate-500 text-sm">No skills listed.</p>}
          </div>
        </div>
        {badges.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-3">Badges</h3>
            <p className="text-slate-600 text-sm">{Array.isArray(badges) ? badges.join(', ') : badges}</p>
          </div>
        )}
      </div>
    </div>
  )
}
