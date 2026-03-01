import { Filter } from 'lucide-react'
import {
  SKILLS_LIST,
  AVAILABILITY_OPTIONS,
  TIME_COMMITMENT_OPTIONS,
  CATEGORIES,
  LOCATION_TYPE_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
  DIFFICULTY_OPTIONS,
} from '../../data/placeholders'

const FILTER_GROUPS = [
  { key: 'skills', label: 'Skills', options: SKILLS_LIST },
  { key: 'availability', label: 'Availability', options: AVAILABILITY_OPTIONS },
  { key: 'timeCommitment', label: 'Time Commitment', options: TIME_COMMITMENT_OPTIONS },
  { key: 'category', label: 'Category', options: CATEGORIES },
  { key: 'locationType', label: 'Remote / In-Person', options: LOCATION_TYPE_OPTIONS },
  { key: 'organizationType', label: 'Organization Type', options: ORGANIZATION_TYPE_OPTIONS },
  { key: 'difficulty', label: 'Difficulty Level', options: DIFFICULTY_OPTIONS },
]

const DEFAULT_FILTERS = {
  skills: [],
  availability: [],
  timeCommitment: [],
  category: [],
  locationType: [],
  organizationType: [],
  difficulty: [],
}

export { DEFAULT_FILTERS }

export default function Filters({ filters, onChange }) {
  const toggle = (key, value) => {
    const current = filters[key] || []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const clearAll = () => {
    onChange({ ...DEFAULT_FILTERS })
  }

  const hasActive = Object.keys(DEFAULT_FILTERS).some(
    (key) => (filters[key] || []).length > 0
  )

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Filter size={18} className="text-slate-500 shrink-0" />
        <span className="text-sm font-medium text-slate-700">Filter opportunities</span>
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
        {FILTER_GROUPS.map(({ key, label, options }) => (
          <div key={key}>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const selected = (filters[key] || []).includes(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(key, opt)}
                    className={`px-2.5 py-1 rounded-lg text-sm border transition ${
                      selected
                        ? 'bg-kindr-primary text-white border-kindr-primary'
                        : 'border-slate-200 text-slate-600 hover:border-kindr-primary'
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
