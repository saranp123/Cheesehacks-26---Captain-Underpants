import { SKILLS_LIST, AVAILABILITY_OPTIONS, TIME_COMMITMENT_OPTIONS } from '../../data/placeholders'
import { Filter } from 'lucide-react'

export default function Filters({ filters, onChange }) {
  const { skills = [], availability = [], timeCommitment = [] } = filters

  const toggle = (key, value) => {
    const current = filters[key] || []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const clearAll = () => {
    onChange({
      skills: [],
      availability: [],
      timeCommitment: [],
    })
  }

  const hasActive = skills.length > 0 || availability.length > 0 || timeCommitment.length > 0

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Filter size={18} className="text-slate-500 shrink-0" />
        <span className="text-sm font-medium text-slate-700">Filter volunteers</span>
        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-kindr-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS_LIST.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggle('skills', skill)}
                className={`px-2.5 py-1 rounded-lg text-sm border transition ${
                  skills.includes(skill)
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
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Availability</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggle('availability', opt)}
                className={`px-2.5 py-1 rounded-lg text-sm border transition ${
                  availability.includes(opt)
                    ? 'bg-kindr-primary text-white border-kindr-primary'
                    : 'border-slate-200 text-slate-600 hover:border-kindr-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Time commitment</p>
          <div className="flex flex-wrap gap-2">
            {TIME_COMMITMENT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggle('timeCommitment', opt)}
                className={`px-2.5 py-1 rounded-lg text-sm border transition ${
                  timeCommitment.includes(opt)
                    ? 'bg-kindr-primary text-white border-kindr-primary'
                    : 'border-slate-200 text-slate-600 hover:border-kindr-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
