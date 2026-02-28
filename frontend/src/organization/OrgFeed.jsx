import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import FilterBar from '../components/FilterBar'
import { useAuth } from '../context/AuthContext'
import { fetchTasks } from '../firebase/tasks'
import { PLACEHOLDER_VOLUNTEERS } from '../data/placeholders'
import { MessageCircle, Filter } from 'lucide-react'

export default function OrgFeed() {
  const { profile } = useAuth()
  const [tasks, setTasks] = useState([])
  const [category, setCategory] = useState(null)
  const [volunteerFilter, setVolunteerFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const orgId = profile?.id

  useEffect(() => {
    let cancelled = false
    fetchTasks({ organizationId: orgId, category }).then(data => {
      if (!cancelled) {
        setTasks(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [orgId, category])

  const volunteers = PLACEHOLDER_VOLUNTEERS.filter(
    v => !volunteerFilter || v.skills.some(s => s.toLowerCase().includes(volunteerFilter.toLowerCase()))
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Your posted tasks</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <FilterBar category={category} onCategoryChange={setCategory} />
      </div>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 mb-10">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              showOrg
              assignedCount={(task.assigned_users || []).length}
            />
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Suggested volunteers</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Filter by skill..."
            value={volunteerFilter}
            onChange={e => setVolunteerFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm w-48"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {volunteers.map(v => (
            <div key={v.id} className="bg-white rounded-xl border border-slate-200 p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">{v.name}</p>
                <p className="text-sm text-slate-500">{v.skills.join(', ')} · {v.volunteer_hours ?? 0} hrs · {v.tasksCompleted ?? 0} tasks</p>
                <p className="text-xs text-slate-400">{v.availability}</p>
                {(v.badges || []).length > 0 && (
                  <p className="text-xs text-amber-600 mt-0.5">{(v.badges || []).join(', ')}</p>
                )}
              </div>
              <button
                className="p-2 rounded-lg bg-kindr-primary/10 text-kindr-primary hover:bg-kindr-primary hover:text-white transition flex items-center gap-1 text-sm"
                title="Notify / message"
              >
                <MessageCircle size={16} /> Message
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
