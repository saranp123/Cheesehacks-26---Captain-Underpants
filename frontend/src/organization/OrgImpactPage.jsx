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
        .catch(() => {})
    }
  }, [apiUrl, profile?.id])

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Organization impact</h1>
      <p className="text-slate-500 mb-6">Volunteer hours and impact across your posted tasks</p>

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
          <p className="text-sm text-slate-500">Total volunteers</p>
          <p className="text-2xl font-bold text-kindr-primary">{data.totalVolunteers}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total hours</p>
          <p className="text-2xl font-bold text-kindr-secondary">{data.totalHours}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Tasks completed</p>
          <p className="text-2xl font-bold text-slate-800">{data.totalTasksCompleted ?? data.totalHours}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Activity types</p>
          <p className="text-2xl font-bold text-slate-800">{data.activities?.length ?? 0}</p>
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
          <h3 className="font-semibold text-slate-800 mb-4">Hours per activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.activities || []}
                  dataKey="hours"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Top volunteers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Hours</th>
                <th className="pb-2">Tasks completed</th>
              </tr>
            </thead>
            <tbody>
              {(data.topVolunteers || []).map((p, i) => (
                <tr key={p.name + i} className="border-b border-slate-100">
                  <td className="py-2 font-medium">{p.name}</td>
                  <td className="py-2">{p.hours}h</td>
                  <td className="py-2">{p.tasksCompleted ?? p.tasks ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
