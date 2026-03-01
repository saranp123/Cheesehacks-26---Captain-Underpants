import { useState, useMemo } from 'react'
import Filters, { DEFAULT_FILTERS } from './UserFeed/Filters'
import OpportunityListItem from './UserFeed/OpportunityListItem'
import { sortByRecommendation } from './UserFeed/RecommendationUtils'
import { applyOpportunityFilters } from './UserFeed/applyFilters'
import { USER_FEED_PROFILE, PLACEHOLDER_TASKS } from '../data/placeholders'

export default function UserFeed() {
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS)

  const userProfile = USER_FEED_PROFILE
  const opportunityList = PLACEHOLDER_TASKS

  const filteredOpportunities = useMemo(
    () => applyOpportunityFilters(opportunityList, activeFilters),
    [opportunityList, activeFilters]
  )

  const sortedOpportunities = useMemo(
    () => sortByRecommendation(filteredOpportunities, userProfile),
    [filteredOpportunities, userProfile]
  )

  const handleApply = (taskId) => {
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

      {sortedOpportunities.length === 0 ? (
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
                onApply={handleApply}
                onViewDetails={handleViewDetails}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
