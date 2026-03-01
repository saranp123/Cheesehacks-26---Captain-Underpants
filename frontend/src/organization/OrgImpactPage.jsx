import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../context/AuthContext'

const MOCK_ORG_IMPACT = {
  totalVolunteers: 45,
  totalHours: 220,
  totalTasksCompleted: 58,
  activities: [
    { name: 'Social Media Campaign', hours: 40 },
    { name: 'Community Cleanup', hours: 100 },
    { name: 'Tutoring', hours: 80 },
  ],
  topVolunteers: [
    { name: 'Saran P.', hours: 40, tasksCompleted: 5 },
    { name: 'Alex T.', hours: 35, tasksCompleted: 4 },
    { name: 'Jordan L.', hours: 28, tasksCompleted: 6 },
  ],
  growthOverTime: [
    { week: 'Week 1', hours: 30 },
    { week: 'Week 2', hours: 45 },
    { week: 'Week 3', hours: 60 },
    { week: 'Week 4', hours: 85 },
  ],
}

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']

export default function OrgImpactPage() {
  const { profile } = useAuth()
  const [range, setRange] = useState('3m')
  const [data, setData] = useState(MOCK_ORG_IMPACT)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (apiUrl && profile?.id) {
      fetch(`${apiUrl}/impact/org/${profile.id}`)
        .then(res => res.ok ? res.json() : null)
        .then(d => d && setData(d))
        .catch(() => setData(MOCK_ORG_IMPACT))
    }
  }, [apiUrl, profile?.id])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Organization Impact</h1>
          <p className="text-slate-500">Track volunteer contributions, activity insights, and team performance</p>
        </div>

        {/* Time Range Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['1m', '3m', '6m', '1y'].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                range === r
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {r === '1m' ? '1 Mo' : r === '3m' ? '3 Mo' : r === '6m' ? '6 Mo' : '1 Year'}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Total Volunteers</p>
                <p className="text-3xl font-bold text-blue-600">{data.totalVolunteers}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg">👥</div>
            </div>
            <p className="text-xs text-slate-500">volunteer members</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Total Hours</p>
                <p className="text-3xl font-bold text-green-600">{data.totalHours}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">⏱️</div>
            </div>
            <p className="text-xs text-slate-500">hours contributed</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-amber-600">{data.totalTasksCompleted ?? data.totalHours}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-lg">✅</div>
            </div>
            <p className="text-xs text-slate-500">tasks finished</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Activity Types</p>
                <p className="text-3xl font-bold text-purple-600">{data.activities?.length ?? 0}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-lg">📊</div>
            </div>
            <p className="text-xs text-slate-500">activity categories</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Hours Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.growthOverTime || []}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="hours" fill="#0ea5e9" name="Hours" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Hours Per Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.activities || []}
                    dataKey="hours"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, hours }) => `${name} ${hours}h`}
                  >
                    {(data.activities || []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Volunteers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 text-lg">Top Volunteers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-3 font-semibold text-xs uppercase tracking-wide">Rank</th>
                  <th className="pb-3 font-semibold text-xs uppercase tracking-wide">Name</th>
                  <th className="pb-3 font-semibold text-xs uppercase tracking-wide">Hours</th>
                  <th className="pb-3 font-semibold text-xs uppercase tracking-wide">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {(data.topVolunteers || []).map((p, i) => (
                  <tr key={p.name + i} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">#{i+1}</span>
                    </td>
                    <td className="py-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-3"><span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">{p.hours}h</span></td>
                    <td className="py-3"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">{p.tasksCompleted ?? p.tasks ?? 0}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
