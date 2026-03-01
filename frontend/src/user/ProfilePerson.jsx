import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BADGES } from '../data/placeholders'
import { Clock, Award, Tag } from 'lucide-react'
import { getUser, normalizeUser } from '../api/client'

export default function ProfilePerson() {
  const { profile } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const id = profile?.id || 'v_10485'
    setLoading(true)
    setError(null)
    getUser(id)
      .then((data) => { if (!cancelled) setUserData(normalizeUser(data) ?? data) })
      .catch((err) => { if (!cancelled) setError(err?.message || 'Failed to load profile') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [profile?.id])

  const src = userData || profile || {}
  const badges = (src?.badges || []).map(id => BADGES.find(b => b.id === id)).filter(Boolean)
  const skills = src?.skills || []
  const hours = src?.volunteer_hours ?? src?.volunteerHours ?? 0

  const completedTasks = src?.completed_tasks ?? []

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-700 border border-red-200 shadow-sm">
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500">Loading profile…</p>
            </div>
          </div>
        ) : (
          <>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 shadow-sm">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
            {(src?.name || profile?.name || 'U')[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{src?.name || profile?.name || 'Volunteer'}</h2>
            <p className="text-slate-600 font-medium mb-4">{profile?.email}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">{hours}</span>
                <span className="text-slate-600 font-medium">hours contributed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">{completedTasks.length}</span>
                <span className="text-slate-600 font-medium">tasks completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Tag size={20} /> Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.length ? skills.map(s => (
              <span key={s} className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                {s}
              </span>
            )) : (
              <p className="text-slate-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award size={20} /> Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.length ? badges.map(b => (
              <div
                key={b.id}
                className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 hover:shadow-md transition-all"
                title={b.criteria}
              >
                <span className="text-3xl mb-1">{b.icon}</span>
                <span className="text-xs text-amber-900 font-semibold text-center">{b.name}</span>
              </div>
            )) : (
              <p className="text-slate-500 text-sm">Complete tasks to earn badges!</p>
            )}
          </div>
        </div>
      </div>
        </>
      )}
      </div>
    </div>
  )
}
