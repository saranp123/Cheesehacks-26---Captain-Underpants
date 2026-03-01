import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, SKILLS_LIST } from '../data/placeholders'
import { createOpportunity } from '../api/client'

export default function PostOpportunity() {
  const { profile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [customSkillInput, setCustomSkillInput] = useState('')

  const initialForm = {
    title: '',
    description: '',
    skills: [],
    customSkills: [],
    category: '',
    customCategory: '',
    badges: [],
    timeCommitmentMinutes: 60,
    // optional organization info for preview
    organizationId: profile?.id,
    organizationName: profile?.name,
  }

  const [form, setForm] = useState(initialForm)
  const TASK_BADGES = ['Quick Task', 'Newbie Friendly']

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const addCustomSkill = () => {
    const v = customSkillInput.trim()
    if (!v) return
    setForm(prev => {
      const already = prev.customSkills.includes(v)
      return {
        ...prev,
        customSkills: already ? prev.customSkills : [...prev.customSkills, v],
        skills: prev.skills.includes(v) ? prev.skills : [...prev.skills, v],
      }
    })
    setCustomSkillInput('')
  }

  const removeSkill = (skill) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // build payload expected by backend: orgId, title, description, requiredTags, requiredSkills, date, durationHours
      const payload = {
        orgId: profile?.id || form.organizationId,
        title: form.title,
        description: form.description,
        requiredTags: form.badges || [],
        requiredSkills: form.skills || [],
        date: new Date().toISOString(),
        durationHours: Number((form.timeCommitmentMinutes / 60).toFixed(2)),
        category: form.category === 'Other' ? form.customCategory || 'Other' : form.category,
      }

      createOpportunity(payload).then(res => {
        console.log('Create opportunity response:', res)
      }).catch(err => {
        console.error('Error creating opportunity', err)
      })

      // reset form after submit
      setForm({ ...initialForm, organizationId: profile?.id, organizationName: profile?.name })
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
            rows={5}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
          />
          <p className="text-xs text-slate-400 mt-1">Describe the volunteering task in detail so volunteers understand expectations</p>
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
            <option value="Other">Other</option>
          </select>
          {form.category === 'Other' && (
            <input
              type="text"
              value={form.customCategory}
              onChange={e => setForm(prev => ({ ...prev, customCategory: e.target.value }))}
              placeholder="Custom category"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
            />
          )}
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
                  form.skills.includes(skill)
                    ? 'bg-kindr-primary text-white border-kindr-primary'
                    : 'border-slate-200 text-slate-600 hover:border-kindr-primary'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Add Custom Skill"
              value={customSkillInput}
              onChange={e => setCustomSkillInput(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
            />
            <button type="button" onClick={addCustomSkill} className="px-4 py-2.5 rounded-lg bg-slate-800 text-white">Add Skill</button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {form.skills.map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-2">
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Time Commitment (Minutes)</label>
          <input
            type="number"
            min={1}
            max={10000}
            value={form.timeCommitmentMinutes}
            onChange={e => setForm(prev => ({ ...prev, timeCommitmentMinutes: Math.max(1, Math.min(10000, Number(e.target.value) || 0)) }))}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 max-w-[240px]"
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

      <div className="mt-8 max-w-xl">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Live preview</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg text-slate-800">{form.title || 'Opportunity title'}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-kindr-primary/10 text-kindr-primary whitespace-nowrap">
              {form.category === 'Other' ? (form.customCategory || 'Other') : (form.category || 'Uncategorized')}
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2">{form.description || 'Opportunity description will appear here.'}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {form.skills.map(skill => (
              <span key={skill} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">{skill}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">{form.timeCommitmentMinutes ? `${form.timeCommitmentMinutes} min` : '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
