import { useAuth } from '../context/AuthContext'
import { Building2, ListTodo, Users } from 'lucide-react'

export default function ProfileOrg() {
  const { profile } = useAuth()
  const taskIds = profile?.posted_tasks || []
  const volunteerIds = profile?.volunteers || []

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Organization profile</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap gap-6">
          <div className="w-20 h-20 rounded-xl bg-kindr-secondary/20 flex items-center justify-center">
            <Building2 className="w-10 h-10 text-kindr-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{profile?.name || 'Organization'}</h2>
            <div className="flex items-center gap-6 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <ListTodo size={16} /> {taskIds.length} tasks posted
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} /> {volunteerIds.length} volunteer(s) connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
