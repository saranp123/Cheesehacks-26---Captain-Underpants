import { useState } from 'react'
import { Zap, X, Plus } from 'lucide-react'

export default function SkillsSection({ skills, onSkillAdd, onSkillRemove, isEditing }) {
  const [skillInput, setSkillInput] = useState('')

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      onSkillAdd(skillInput.trim())
      setSkillInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Zap size={20} />
        Skills
      </h2>

      {isEditing && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <button
            onClick={handleAddSkill}
            className="px-3 py-2 rounded-lg bg-kindr-primary text-white text-sm font-medium hover:bg-kindr-secondary flex items-center gap-1"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <p className="text-slate-400 text-sm italic w-full">No skills added yet.</p>
        ) : (
          skills.map(skill => (
            <div
              key={skill}
              className="px-3 py-1.5 rounded-full bg-kindr-primary/10 text-kindr-primary text-sm font-medium flex items-center gap-2 group"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => onSkillRemove(skill)}
                  className="text-kindr-primary/50 hover:text-kindr-primary transition opacity-0 group-hover:opacity-100"
                  title="Remove skill"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
