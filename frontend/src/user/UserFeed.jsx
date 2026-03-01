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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover Volunteer Opportunities</h1>
          <p className="text-slate-500 text-sm">Find meaningful tasks that match your skills and availability</p>
        </div>
        
        <div className="mb-6">
          <Filters filters={activeFilters} onChange={setActiveFilters} />
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-2xl border border-red-200 bg-red-50/80 text-red-700 shadow-sm">
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-kindr-primary rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500">Loading opportunities...</p>
            </div>
          </div>
        ) : sortedOpportunities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No opportunities found</h3>
            <p className="text-slate-500">Try adjusting your filters to see more opportunities</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedOpportunities.map((opp) => (
              <OpportunityListItem
                key={opp.id}
                opportunity={opp}
                matchPercentage={opp._matchPercentage ?? 0}
                onApply={() => handleApply(opp.id)}
                onViewDetails={() => handleViewDetails(opp.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
