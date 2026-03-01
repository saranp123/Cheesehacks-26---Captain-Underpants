import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createTask } from '../firebase/tasks'
import { CATEGORIES, SKILLS_LIST } from '../data/placeholders'

export default function PostOpportunity() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    required_skills: [],
    category: '',
    time_estimate: 60,
    badges: [],
    organizationId: profile?.id,
    organizationName: profile?.name,
  })
  const TASK_BADGES = ['Quick Task', 'Newbie Friendly']

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      required_skills: prev.required_skills.includes(skill)
        ? prev.required_skills.filter(s => s !== skill)
        : [...prev.required_skills, skill],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createTask(form)
      navigate('/org/feed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Post an opportunity</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Tutor math for 1 hour"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            required
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the task..."
            rows={3}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            required
            value={form.category}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
          >
            <option value="">Select...</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Required skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILLS_LIST.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                  form.required_skills.includes(skill)
                    ? 'bg-kindr-primary text-white border-kindr-primary'
                    : 'border-slate-200 text-slate-600 hover:border-kindr-primary'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estimated time (minutes)</label>
          <input
            type="number"
            min={15}
            step={15}
            value={form.time_estimate}
            onChange={e => setForm(prev => ({ ...prev, time_estimate: Number(e.target.value) || 60 }))}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 max-w-[200px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Optional badges</label>
          <div className="flex flex-wrap gap-2">
            {TASK_BADGES.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, badges: prev.badges.includes(b) ? prev.badges.filter(x => x !== b) : [...prev.badges, b] }))}
                className={`px-3 py-1.5 rounded-lg text-sm border ${form.badges.includes(b) ? 'bg-amber-100 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Post opportunity'}
        </button>
      </form>
    </div>
  )
}
