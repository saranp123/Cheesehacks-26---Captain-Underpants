import { useAuth } from '../context/AuthContext'
import { BADGES } from '../data/placeholders'
import { Clock, Award, Tag } from 'lucide-react'

export default function ProfilePerson() {
  const { profile } = useAuth()
  const badges = (profile?.badges || []).map(id => BADGES.find(b => b.id === id)).filter(Boolean)
  const skills = profile?.skills || []
  const hours = profile?.volunteer_hours ?? 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My profile</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap gap-6">
          <div className="w-20 h-20 rounded-full bg-kindr-primary/20 flex items-center justify-center text-3xl">
            {(profile?.name || 'U')[0]}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{profile?.name || 'Volunteer'}</h2>
            <p className="text-slate-500">{profile?.email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock size={16} /> {hours} volunteer hours
              </span>
              <span className="flex items-center gap-1">
                {(profile?.completed_tasks || []).length} tasks completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Tag size={18} /> Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.length ? skills.map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-kindr-primary/10 text-kindr-primary text-sm">
                {s}
              </span>
            )) : (
              <p className="text-slate-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Award size={18} /> Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.length ? badges.map(b => (
              <div
                key={b.id}
                className="flex flex-col items-center p-3 rounded-lg bg-slate-50 border border-slate-100"
                title={b.criteria}
              >
                <span className="text-2xl mb-1">{b.icon}</span>
                <span className="text-xs text-slate-600">{b.name}</span>
              </div>
            )) : (
              <p className="text-slate-500 text-sm">Complete tasks to earn badges!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
