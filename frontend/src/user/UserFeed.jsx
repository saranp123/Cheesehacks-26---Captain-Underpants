import { useState, useMemo, useEffect } from 'react'
import Filters, { DEFAULT_FILTERS } from './UserFeed/Filters'
import OpportunityListItem from './UserFeed/OpportunityListItem'
import { sortByRecommendation } from './UserFeed/RecommendationUtils'
import { applyOpportunityFilters } from './UserFeed/applyFilters'
import { USER_FEED_PROFILE, PLACEHOLDER_TASKS } from '../data/placeholders'
import { getOpportunities } from '../api/client'

export default function UserFeed() {
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS)
  const [opportunityList, setOpportunityList] = useState(PLACEHOLDER_TASKS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getOpportunities()
      .then((data) => {
        if (!cancelled) {
          setOpportunityList(Array.isArray(data) && data.length > 0 ? data : PLACEHOLDER_TASKS)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(null) // Silent fallback to mock data
          setOpportunityList(PLACEHOLDER_TASKS)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  const filteredOpportunities = useMemo(
    () => applyOpportunityFilters(opportunityList, activeFilters),
    [opportunityList, activeFilters]
  )

  const sortedOpportunities = useMemo(
    () => sortByRecommendation(filteredOpportunities, USER_FEED_PROFILE),
    [filteredOpportunities, USER_FEED_PROFILE]
  )

  const handleApply = (taskId) => {
    // TODO: Implement backend apply logic
    console.log('Apply for task:', taskId)
  }

  const handleViewDetails = (taskId) => {
    window.location.hash = ''
    // Navigation is handled by Link in OpportunityListItem
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Find micro-tasks</h1>
      <Filters filters={activeFilters} onChange={setActiveFilters} />
      
      {error && (
        <p className="text-red-600 py-4 rounded-xl border border-red-200 bg-red-50/50 px-4 text-center mb-4">
          {error}
        </p>
      )}
      
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : sortedOpportunities.length === 0 ? (
        <p className="text-slate-500 py-8 rounded-xl border border-slate-200 bg-slate-50/50 p-6 text-center">
          No opportunities match your filters. Try adjusting your selections.
        </p>
      ) : (
        <ul className="space-y-3 list-none p-0 m-0">
          {sortedOpportunities.map((opp) => (
            <li key={opp.id}>
              <OpportunityListItem
                opportunity={opp}
                matchPercentage={opp._matchPercentage ?? 0}
                onApply={() => handleApply(opp.id)}
                onViewDetails={() => handleViewDetails(opp.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
