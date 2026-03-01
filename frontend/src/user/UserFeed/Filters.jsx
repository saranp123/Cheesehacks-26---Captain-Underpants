import { Filter } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
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
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

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
    <div className="flex items-center gap-3 mb-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition"
        >
          <Filter size={18} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Filters</span>
          {hasActive && (
            <span className="ml-2 inline-block w-2 h-2 bg-kindr-primary rounded-full"></span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute left-0 mt-2 w-96 max-h-96 bg-white rounded-xl shadow-lg z-50 p-4 border border-slate-200 overflow-y-auto transition-all">
            <div className="grid grid-cols-2 gap-4">
              {FILTER_GROUPS.map(({ key, label, options }) => (
                <div key={key}>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    {label}
                  </p>
                  <div className="space-y-2">
                    {options.map((opt) => {
                      const selected = (filters[key] || []).includes(opt)
                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggle(key, opt)}
                            className="w-4 h-4 rounded border-slate-300 text-kindr-primary"
                          />
                          <span className="text-sm text-slate-600">{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Clear All button */}
            {hasActive && (
              <button
                type="button"
                onClick={clearAll}
                className="w-full mt-4 pt-4 border-t text-sm text-kindr-primary hover:text-kindr-primary/80 font-medium transition"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

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
  )
}
