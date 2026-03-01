import { useParams, useNavigate } from 'react-router-dom'
import { PLACEHOLDER_VOLUNTEERS } from '../data/placeholders'
import { getFeaturedVolunteer } from './profileData'
import { MessageCircle, ArrowLeft, Clock, Award, User } from 'lucide-react'

export default function VolunteerProfileView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const volunteer = PLACEHOLDER_VOLUNTEERS.find((v) => v.id === id)
  const featured = getFeaturedVolunteer(id)

  if (!volunteer && !featured) {
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

  if (featured && !volunteer) {
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

  const { name, skills = [], availability, timeCommitment, tasksCompleted = 0, volunteer_hours = 0, badges = [] } = volunteer

  return (
    <div>
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
            {name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock size={16} /> {availability} · {timeCommitment || '—'}
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
          </div>
        </div>
        {badges.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-3">Badges</h3>
            <p className="text-slate-600 text-sm">{badges.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
