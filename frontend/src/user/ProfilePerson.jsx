import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BADGES } from '../data/placeholders'
import { Clock, Award, Tag, Edit2, Save, X } from 'lucide-react'
import { getUser, normalizeUser } from '../api/client'

export default function ProfilePerson() {
  const { profile } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    pastExperiences: '',
    skills: [],
    resume: null,
  })

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

  useEffect(() => {
    if (userData && !formData.name) {
      setFormData({
        name: userData.name || profile?.name || 'Volunteer',
        about: userData.about || 'Passionate about making a difference in the community.',
        pastExperiences: userData.pastExperiences || 'This is your space to share your volunteering journey and past experiences.',
        skills: userData.skills || [],
        resume: null,
      })
    }
  }, [userData])

  const handleEditStart = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData({
      ...userData,
      name: formData.name,
      about: formData.about,
      pastExperiences: formData.pastExperiences,
      skills: formData.skills,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: userData?.name || profile?.name || 'Volunteer',
      about: userData?.about || 'Passionate about making a difference in the community.',
      pastExperiences: userData?.pastExperiences || 'This is your space to share your volunteering journey and past experiences.',
      skills: userData?.skills || [],
      resume: null,
    })
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const src = userData || profile || {}
  const badges = (src?.badges || []).map(id => BADGES.find(b => b.id === id)).filter(Boolean)
  const skills = src?.skills || []
  const hours = src?.volunteer_hours ?? src?.volunteerHours ?? 0

  const completedTasks = src?.completed_tasks ?? []

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          {!isEditing && (
            <button
              onClick={handleEditStart}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <Edit2 size={18} /> Edit Profile
            </button>
          )}
        </div>

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
        ) : isEditing ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Edit Your Profile</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">About You</label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Past Experiences</label>
                  <textarea
                    value={formData.pastExperiences}
                    onChange={(e) => setFormData(prev => ({ ...prev, pastExperiences: e.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Teaching', 'Writing', 'Design', 'Coding', 'Social Media', 'Events', 'Research', 'Tutoring'].map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                          formData.skills.includes(skill)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Resume (Optional)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="w-full"
                  />
                  {formData.resume && (
                    <p className="text-sm text-slate-600 mt-2">Selected: {formData.resume.name}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              </div>
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

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-3">About</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{src?.about || 'No about information added yet.'}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-3">Past Experiences</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{src?.pastExperiences || 'No past experiences added yet.'}</p>
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
