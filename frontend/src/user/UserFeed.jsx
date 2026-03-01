import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import FilterBar from '../components/FilterBar'
import { useAuth } from '../context/AuthContext'
import { fetchTasks, claimTask, completeTask } from '../firebase/tasks'

export default function UserFeed() {
  const { profile } = useAuth()
  const [tasks, setTasks] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const userSkills = profile?.skills || []

  useEffect(() => {
    let cancelled = false
    fetchTasks({ category }).then(data => {
      if (!cancelled) {
        setTasks(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [category])

  const handleClaim = async (taskId) => {
    await claimTask(taskId, profile?.id)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assigned_users: [...(t.assigned_users || []), profile?.id] } : t))
  }

  const handleComplete = async (taskId) => {
    await completeTask(taskId, profile?.id)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const aMatch = (a.required_skills || []).filter(s => userSkills.includes(s)).length
    const bMatch = (b.required_skills || []).filter(s => userSkills.includes(s)).length
    if (bMatch !== aMatch) return bMatch - aMatch
    return (a.time_estimate || 0) - (b.time_estimate || 0)
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Find micro-tasks</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <FilterBar category={category} onCategoryChange={setCategory} />
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
