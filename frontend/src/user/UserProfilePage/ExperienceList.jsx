import { useState } from 'react'
import { Briefcase, Trash2, Plus } from 'lucide-react'

export default function ExperienceList({ experiences, onAdd, onRemove, isEditing }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    role: '',
    org: '',
    dates: '',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.role && formData.org && formData.dates) {
      onAdd(formData)
      setFormData({ role: '', org: '', dates: '', description: '' })
      setShowForm(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Briefcase size={20} />
          Experience
        </h2>
        {isEditing && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-3 py-1 rounded-lg bg-kindr-primary/10 text-kindr-primary text-sm font-medium hover:bg-kindr-primary/20 flex items-center gap-1"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      {/* Add Experience Form */}
      {isEditing && showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <input
            type="text"
            name="org"
            placeholder="Organization"
            value={formData.org}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <input
            type="text"
            name="dates"
            placeholder="Dates (e.g. Jan 2025 - Mar 2025)"
            value={formData.dates}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-kindr-primary text-white text-sm font-medium hover:bg-kindr-secondary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {experiences.length === 0 ? (
          <p className="text-slate-400 text-sm italic">No experiences added yet.</p>
        ) : (
          experiences.map(exp => (
            <div key={exp.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-slate-800">{exp.role}</h3>
                  <p className="text-sm text-slate-600">{exp.org}</p>
                  <p className="text-xs text-slate-500 mt-1">{exp.dates}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => onRemove(exp.id)}
                    className="text-slate-400 hover:text-red-500 transition"
                    title="Remove experience"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              {exp.description && (
                <p className="text-slate-600 text-sm">{exp.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
