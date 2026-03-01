import { CATEGORIES } from '../data/placeholders'

export default function FilterBar({ category, onCategoryChange, label = 'Category' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-500">{label}:</span>
      <select
        value={category || ''}
        onChange={e => onCategoryChange(e.target.value || null)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
      >
        <option value="">All</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
