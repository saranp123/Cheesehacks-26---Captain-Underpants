import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function ImpactSnapshot({ org }) {
  const {
    totalHours,
    tasksCompleted,
    totalVolunteers,
    categoriesOfImpact,
    badge,
  } = org

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Impact Snapshot</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total volunteer hours</p>
          <p className="text-2xl font-bold text-kindr-primary">{totalHours}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Tasks completed</p>
          <p className="text-2xl font-bold text-kindr-secondary">{tasksCompleted}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Active volunteers</p>
          <p className="text-2xl font-bold text-slate-800">{totalVolunteers}</p>
        </div>
        {badge && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center justify-center">
            <p className="text-sm font-medium text-amber-800">🏆 {badge}</p>
          </div>
        )}
      </div>
      {categoriesOfImpact && categoriesOfImpact.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Hours by category</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesOfImpact} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="hours" name="Hours" radius={[0, 4, 4, 0]}>
                {(categoriesOfImpact || []).map((entry, i) => (
                  <Cell key={i} fill={entry.color || '#0ea5e9'} />
                ))}
              </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  )
}
