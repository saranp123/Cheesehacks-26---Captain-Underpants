import { useState, useMemo, useEffect } from 'react'
import Filters, { DEFAULT_FILTERS } from './UserFeed/Filters'
import OpportunityListItem from './UserFeed/OpportunityListItem'
import { sortByRecommendation } from './UserFeed/RecommendationUtils'
import { applyOpportunityFilters } from './UserFeed/applyFilters'
import { USER_FEED_PROFILE } from '../data/placeholders'
import { getOpportunities } from '../api/client'

export default function UserFeed() {
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS)
  const [opportunityList, setOpportunityList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOpportunities().then((data) => {
      setOpportunityList(data || [])
      setLoading(false)
    })
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
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : sortedOpportunities.length === 0 ? (
        <p className="text-slate-500 py-8">No opportunities found.</p>
      ) : (
        sortedOpportunities.map((opp) => (
          <OpportunityListItem
            key={opp.id}
            opportunity={opp}
            onApply={() => handleApply(opp.id)}
            onViewDetails={() => handleViewDetails(opp.id)}
          />
        ))
      )}
    </div>
  )
}
