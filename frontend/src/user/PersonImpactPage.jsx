import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { BADGES } from '../data/placeholders'

const MOCK_PERSON_IMPACT = {
  name: 'Saran P.',
  totalHours: 55,
  tasksCompleted: 12,
  activities: [
    { name: 'Tutoring', hours: 20 },
    { name: 'Community Cleanup', hours: 25 },
    { name: 'Social Media Campaign', hours: 10 },
  ],
  categoryBreakdown: { Education: 20, Environment: 25, Social: 10 },
  growthOverTime: [
    { week: 'Week 1', hours: 5 },
    { week: 'Week 2', hours: 10 },
    { week: 'Week 3', hours: 15 },
    { week: 'Week 4', hours: 25 },
  ],
  topActivities: [
    { name: 'Community Cleanup', hours: 25 },
    { name: 'Tutoring', hours: 20 },
  ],
}

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6']

export default function PersonImpactPage() {
  const { profile } = useAuth()
  const [range, setRange] = useState('3m')
  const [data, setData] = useState({ ...MOCK_PERSON_IMPACT, name: profile?.name || MOCK_PERSON_IMPACT.name, totalHours: profile?.volunteer_hours ?? MOCK_PERSON_IMPACT.totalHours, tasksCompleted: (profile?.completed_tasks || []).length || MOCK_PERSON_IMPACT.tasksCompleted })
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (apiUrl && profile?.id) {
      fetch(`${apiUrl}/impact/user/${profile.id}`)
        .then(res => res.ok ? res.json() : null)
        .then(d => d && setData(prev => ({ ...prev, ...d })))
        .catch(() => {})
    }
  }, [apiUrl, profile?.id])

  const categoryData = data.categoryBreakdown ? Object.entries(data.categoryBreakdown).map(([name, value]) => ({ name, value })) : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">My impact</h1>
      <p className="text-slate-500 mb-6">Your volunteer hours, tasks, and badges</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {['1m', '3m', '6m', '1y'].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 rounded-lg text-sm ${range === r ? 'bg-kindr-primary text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {r === '1m' ? '1 month' : r === '3m' ? '3 months' : r === '6m' ? '6 months' : '1 year'}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total hours</p>
          <p className="text-2xl font-bold text-kindr-primary">{data.totalHours}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Tasks completed</p>
          <p className="text-2xl font-bold text-kindr-secondary">{data.tasksCompleted}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Badges</p>
          <p className="text-2xl font-bold text-slate-800">{(profile?.badges || []).length || (data.badges || []).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Top activities</p>
          <p className="text-2xl font-bold text-slate-800">{(data.topActivities || []).length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Hours over time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.growthOverTime || []}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#0ea5e9" name="Hours" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Category breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name} ${value}h`}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Hours per activity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.activities || []} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Bar dataKey="hours" fill="#06b6d4" name="Hours" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Top activities</h3>
          <ul className="space-y-2">
            {(data.topActivities || []).map((a, i) => (
              <li key={a.name + i} className="flex justify-between text-sm">
                <span className="text-slate-700">{a.name}</span>
                <span className="font-medium text-kindr-primary">{a.hours}h</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(profile?.badges || data.badges || []).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Badges</h3>
          <div className="flex flex-wrap gap-3">
            {(profile?.badges || data.badges || []).map(id => {
              const b = BADGES.find(x => x.id === id)
              return b ? (
                <div key={b.id} className="flex flex-col items-center p-3 rounded-lg bg-slate-50 border border-slate-100" title={b.criteria}>
                  <span className="text-2xl mb-1">{b.icon}</span>
                  <span className="text-xs text-slate-600">{b.name}</span>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
