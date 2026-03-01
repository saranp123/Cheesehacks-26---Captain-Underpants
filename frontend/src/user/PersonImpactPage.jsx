import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { BADGES } from '../data/placeholders'
import { TrendingUp, Award, Clock, CheckCircle } from 'lucide-react'

// Generate realistic mock data for a full year
const generateYearData = () => {
  const weeklyData = []
  const activities = ['Tutoring', 'Community Cleanup', 'Social Media Campaign', 'Event Planning', 'Food Distribution']
  const categoryMap = {
    'Tutoring': 'Education',
    'Community Cleanup': 'Environment',
    'Social Media Campaign': 'Social',
    'Event Planning': 'Social',
    'Food Distribution': 'Health',
  }

  // 52 weeks of data
  for (let week = 1; week <= 52; week++) {
    const baseHours = Math.floor(Math.random() * 8) + 2 // 2-10 hours per week
    weeklyData.push({
      week: `W${week}`,
      hours: baseHours,
      date: `2025-${String(Math.ceil(week / 4)).padStart(2, '0')}-${String((week % 4) * 7 + 1).padStart(2, '0')}`,
    })
  }

  // Calculate activity breakdown (full year)
  const activitiesData = [
    { name: 'Tutoring', hours: 65 },
    { name: 'Community Cleanup', hours: 58 },
    { name: 'Social Media Campaign', hours: 32 },
    { name: 'Event Planning', hours: 18 },
    { name: 'Food Distribution', hours: 12 },
  ]

  // Calculate category breakdown
  const categoryBreakdown = {
    Education: 65,
    Environment: 58,
    Social: 50,
    Health: 12,
  }

  // Badges earned by month
  const badgesByMonth = ['', '', 'Top Volunteer', '', 'Community Star', '', 'Eco Warrior', '', '', '', '', 'Volunteer Champion']

  return {
    weeklyData,
    activitiesData,
    categoryBreakdown,
    badgesByMonth,
    totalHours: weeklyData.reduce((sum, w) => sum + w.hours, 0),
    totalTasks: Math.floor(weeklyData.reduce((sum, w) => sum + w.hours, 0) / 2),
  }
}

const fullYearData = generateYearData()

// Filter data based on range
const filterDataByRange = (range) => {
  const { weeklyData } = fullYearData
  let filtered = weeklyData

  if (range === '1m') {
    filtered = weeklyData.slice(-4) // Last 4 weeks
  } else if (range === '3m') {
    filtered = weeklyData.slice(-12) // Last 12 weeks
  } else if (range === '6m') {
    filtered = weeklyData.slice(-26) // Last 26 weeks
  }
  // else range === '1y' - all 52 weeks

  return filtered
}

// Get activities data for selected range
const getActivitiesForRange = (range) => {
  const multiplier = range === '1m' ? 0.077 : range === '3m' ? 0.23 : range === '6m' ? 0.5 : 1
  return fullYearData.activitiesData.map(a => ({
    ...a,
    hours: Math.round(a.hours * multiplier),
  }))
}

// Get category data for selected range
const getCategoriesForRange = (range) => {
  const multiplier = range === '1m' ? 0.077 : range === '3m' ? 0.23 : range === '6m' ? 0.5 : 1
  return Object.entries(fullYearData.categoryBreakdown).map(([name, value]) => ({
    name,
    value: Math.round(value * multiplier),
  }))
}

const BADGE_ICONS = {
  'Top Volunteer': '⭐',
  'Community Star': '✨',
  'Eco Warrior': '🌱',
  'Volunteer Champion': '🏆',
}

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']

export default function PersonImpactPage() {
  const { profile } = useAuth()
  const [range, setRange] = useState('1y')
  const [filteredData, setFilteredData] = useState(filterDataByRange('1y'))
  const [activitiesData, setActivitiesData] = useState(getActivitiesForRange('1y'))
  const [categoryData, setCategoryData] = useState(getCategoriesForRange('1y'))
  const [rangedHours, setRangedHours] = useState(0)
  const [rangedTasks, setRangedTasks] = useState(0)
  const [badges, setBadges] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    // Update all data when range changes
    const newFiltered = filterDataByRange(range)
    setFilteredData(newFiltered)

    const newActivities = getActivitiesForRange(range)
    setActivitiesData(newActivities)

    const newCategories = getCategoriesForRange(range)
    setCategoryData(newCategories)

    const totalHours = newFiltered.reduce((sum, w) => sum + w.hours, 0)
    setRangedHours(totalHours)
    setRangedTasks(Math.ceil(totalHours / 2.5))

    // Get badges for range
    const monthStart = range === '1m' ? 11 : range === '3m' ? 9 : range === '6m' ? 6 : 0
    const badgesInRange = fullYearData.badgesByMonth.slice(monthStart).filter(b => b)
    setBadges(badgesInRange)
  }, [range])

  useEffect(() => {
    if (apiUrl && profile?.id) {
      fetch(`${apiUrl}/impact/user/${profile.id}`)
        .then(res => res.ok ? res.json() : null)
        .then(d => d && setRangedHours(prev => d.totalHours ?? prev))
        .catch(() => {})
    }
  }, [apiUrl, profile?.id])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Impact</h1>
        <p className="text-slate-500">Your volunteer contributions, achievements, and growth</p>
      </div>

      {/* Time Range Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['1m', '3m', '6m', '1y'].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              range === r
                ? 'bg-kindr-primary text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-kindr-primary hover:text-kindr-primary'
            }`}
          >
            {r === '1m' ? '1 Month' : r === '3m' ? '3 Months' : r === '6m' ? '6 Months' : '1 Year'}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-500">Total Hours</p>
            <Clock size={20} className="text-kindr-primary" />
          </div>
          <p className="text-3xl font-bold text-kindr-primary">{rangedHours}</p>
          <p className="text-xs text-slate-400 mt-1">hours contributed</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-500">Tasks Completed</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{rangedTasks}</p>
          <p className="text-xs text-slate-400 mt-1">tasks finished</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-500">Badges Earned</p>
            <Award size={20} className="text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-600">{badges.length}</p>
          <p className="text-xs text-slate-400 mt-1">during this period</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-500">Avg. Per Week</p>
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{Math.round(rangedHours / (filteredData.length || 1))}</p>
          <p className="text-xs text-slate-400 mt-1">hours per week</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Growth Over Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Growth Over Time
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                  name="Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Category Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
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

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Hours per Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Hours per Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activitiesData}
                layout="vertical"
                margin={{ left: 120, right: 20 }}
              >
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#0ea5e9" radius={[0, 8, 8, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Top Activities</h3>
          <div className="space-y-3">
            {activitiesData
              .sort((a, b) => b.hours - a.hours)
              .slice(0, 5)
              .map((activity, idx) => (
                <div key={activity.name} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{activity.name}</p>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(activity.hours / Math.max(...activitiesData.map(a => a.hours))) * 100}%`,
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{activity.hours}h</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      {badges.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Award size={18} /> Badges Earned in This Period
          </h3>
          <div className="flex flex-wrap gap-4">
            {badges.map((badge) => (
              <div
                key={badge}
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 shadow-sm"
              >
                <span className="text-4xl mb-2">{BADGE_ICONS[badge] || '🎖️'}</span>
                <span className="text-sm font-semibold text-amber-900">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
