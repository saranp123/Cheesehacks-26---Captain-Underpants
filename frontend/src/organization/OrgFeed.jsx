import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  PLACEHOLDER_VOLUNTEERS,
  MOCK_APPLICATIONS,
} from '../data/placeholders'
import { getOpportunities, normalizeOpportunity } from '../api/client'
import Filters from './OrgFeed/Filters'
import TaskListItem from './OrgFeed/TaskListItem'

const volunteerById = Object.fromEntries(
  PLACEHOLDER_VOLUNTEERS.map((v) => [v.id, v])
)

function applyVolunteerFilters(volunteers, filters) {
  const { skills = [], availability = [], timeCommitment = [] } = filters
  return volunteers.filter((v) => {
    if (skills.length > 0 && !v.skills?.some((s) => skills.includes(s))) return false
    if (availability.length > 0 && !availability.includes(v.availability)) return false
    if (timeCommitment.length > 0 && !timeCommitment.includes(v.timeCommitment)) return false
    return true
  })
}

function getSuggestedForOpportunity(opportunity, allVolunteers, appliedIds) {
  const required = opportunity.required_skills || []
  if (required.length === 0) {
    return allVolunteers.filter((v) => !appliedIds.includes(v.id))
  }
  return allVolunteers.filter((v) => {
    if (appliedIds.includes(v.id)) return false
    const hasMatch = required.some((r) =>
      (v.skills || []).some(
        (s) => s === r || s.toLowerCase().includes(r.toLowerCase())
      )
    )
    return hasMatch
  })
}

export default function OrgFeed() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [opportunityList, setOpportunityList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    skills: [],
    availability: [],
    timeCommitment: [],
  })
  const [applications, setApplications] = useState(() => {
    const init = {}
    Object.entries(MOCK_APPLICATIONS || {}).forEach(([taskId, ids]) => {
      init[taskId] = [...(ids || [])]
    })
    return init
  })
  const orgId = profile?.id

  useEffect(() => {
    let cancelled = false
    setError(null)
    getOpportunities()
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data.map(normalizeOpportunity).filter(Boolean) : []
        const filtered = orgId ? list.filter((opp) => opp.orgId === orgId || opp.organizationId === orgId) : list
        setOpportunityList(filtered)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load opportunities')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [orgId])

  const filteredVolunteers = useMemo(
    () => applyVolunteerFilters(PLACEHOLDER_VOLUNTEERS, filters),
    [filters]
  )

  const handleMessage = (volunteer) => {
    navigate('/messages')
  }

  const handleNotify = (volunteer) => {
    console.log('Notify suggested user:', volunteer.name)
  }

  const handleAccept = (opportunityId, volunteer) => {
    setApplications((prev) => {
      const next = { ...prev }
      next[opportunityId] = (next[opportunityId] || []).filter(
        (id) => id !== volunteer.id
      )
      return next
    })
    setOpportunityList((prev) =>
      prev.map((opp) => {
        if (opp.id !== opportunityId) return opp
        const assigned = [...(opp.assigned_users || []), volunteer.id]
        return { ...opp, assigned_users: assigned, status: 'claimed' }
      })
    )
  }

  const handleDecline = (opportunityId, volunteer) => {
    setApplications((prev) => {
      const next = { ...prev }
      next[opportunityId] = (next[opportunityId] || []).filter(
        (id) => id !== volunteer.id
      )
      return next
    })
  }

  const handleProfileClick = (volunteer) => {
    navigate(`/volunteer/${volunteer.id}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Your posted opportunities</h1>

      <Filters filters={filters} onChange={setFilters} />

      {error && (
        <p className="text-red-600 py-4 rounded-xl border border-red-200 bg-red-50/50 px-4 text-center mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {opportunityList.length === 0 ? (
            <p className="text-slate-500 py-8">
              No opportunities yet. Post one to see suggested and applied volunteers here.
            </p>
          ) : (
            opportunityList.map((opportunity) => {
              const appliedIds = applications[opportunity.id] || []
              const appliedVolunteers = appliedIds
                .map((id) => volunteerById[id])
                .filter(Boolean)
              const appliedFiltered = applyVolunteerFilters(appliedVolunteers, filters)
              const suggestedVolunteers = getSuggestedForOpportunity(
                opportunity,
                filteredVolunteers,
                appliedIds
              )

              return (
                <TaskListItem
                  key={opportunity.id}
                  opportunity={opportunity}
                  suggestedVolunteers={suggestedVolunteers}
                  appliedVolunteers={appliedFiltered}
                  onMessage={handleMessage}
                  onNotify={handleNotify}
                  onAccept={(v) => handleAccept(opportunity.id, v)}
                  onDecline={(v) => handleDecline(opportunity.id, v)}
                  onProfileClick={handleProfileClick}
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
