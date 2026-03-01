import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import FilterBar from '../components/FilterBar'
import { useAuth } from '../context/AuthContext'
import { getOpportunities, getMatch, claimTaskApi, completeTaskApi } from '../api/client'

export default function UserFeed() {
  const { profile } = useAuth()
  const [tasks, setTasks] = useState([])
  const [category, setCategory] = useState(null)
  const [skillFilter, setSkillFilter] = useState('')
  const [maxTime, setMaxTime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fitScores, setFitScores] = useState({})
  const userSkills = profile?.skills || []

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    // Fetch opportunities from backend API
    getOpportunities(category ? { category } : {}).then(data => {
      if (!cancelled) {
        setTasks(data || [])
        setLoading(false)
      }
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [category])

  // Fetch fit scores for displayed tasks
  useEffect(() => {
    let cancelled = false
    if (!tasks || tasks.length === 0) {
      setFitScores({})
      return
    }
    const uid = profile?.id || 'mock-user'
    const calls = tasks.map(t =>
      getMatch(uid, t.id).then(res => ({ id: t.id, score: res?.fitScore ?? res?.score ?? null })).catch(() => ({ id: t.id, score: null }))
    )
    Promise.all(calls).then(results => {
      if (cancelled) return
      const map = {}
      results.forEach(r => { if (r && r.id) map[r.id] = r.score })
      setFitScores(map)
    })
    return () => { cancelled = true }
  }, [tasks, profile?.id])

  const handleClaim = async (taskId) => {
    await claimTaskApi(taskId, profile?.id)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assigned_users: [...(t.assigned_users || []), profile?.id] } : t))
  }

  const handleComplete = async (taskId) => {
    await completeTaskApi(taskId, profile?.id)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t))
  }

  const filtered = tasks.filter(t => {
    if (skillFilter) {
      const wanted = skillFilter.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
      if (!wanted.every(w => (t.required_skills || []).some(ts => ts.toLowerCase().includes(w)))) return false
    }
    if (maxTime) {
      const time = t.time_estimate ?? t.timeEstimate ?? t.timeCommitmentMinutes ?? null
      if (time && Number(time) > Number(maxTime)) return false
    }
    return true
  })

  const sortedTasks = [...filtered].sort((a, b) => {
    const aMatch = (a.required_skills || []).filter(s => userSkills.includes(s)).length
    const bMatch = (b.required_skills || []).filter(s => userSkills.includes(s)).length
    if (bMatch !== aMatch) return bMatch - aMatch
    return (a.time_estimate || a.timeEstimate || 0) - (b.time_estimate || b.timeEstimate || 0)
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Find micro-tasks</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <FilterBar category={category} onCategoryChange={setCategory} />
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Skills:</label>
          <input value={skillFilter} onChange={e => setSkillFilter(e.target.value)} placeholder="comma-separated" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Max minutes:</label>
          <input type="number" value={maxTime || ''} onChange={e => setMaxTime(e.target.value ? Number(e.target.value) : null)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm max-w-[120px]" />
        </div>
      </div>
      {loading ? (
        <p className="text-slate-500">Loading tasks...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              userSkills={userSkills}
              onClaim={handleClaim}
              onComplete={handleComplete}
              showOrg
              fitScore={fitScores[task.id] ?? null}
            />
          ))}
        </div>
      )}
      {!loading && tasks.length === 0 && (
        <p className="text-slate-500">No tasks yet. Check back later or ask an organization to post one.</p>
      )}
    </div>
  )
}
