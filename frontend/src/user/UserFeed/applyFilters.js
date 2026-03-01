/**
 * Map task time to a time-commitment bucket for filtering.
 */
function getTimeCommitmentBucket(task) {
  const mins = task.time_estimate
  if (mins == null) return 'Flexible'
  if (mins <= 30) return '30 mins'
  if (mins <= 60) return '1 hour'
  if (mins <= 180) return '2–3 hours'
  return 'Flexible'
}

/**
 * Apply active filters to opportunity list.
 * Each filter group is OR within (match any selected); groups are AND.
 */
export function applyOpportunityFilters(opportunities, filters) {
  const {
    skills = [],
    availability = [],
    timeCommitment = [],
    category = [],
    locationType = [],
    organizationType = [],
    difficulty = [],
  } = filters

  return opportunities.filter((opp) => {
    if (skills.length > 0) {
      const oppSkills = opp.required_skills || []
      const hasSkill = skills.some((s) => oppSkills.includes(s))
      if (!hasSkill) return false
    }
    if (availability.length > 0 && opp.availability != null) {
      if (!availability.includes(opp.availability)) return false
    }
    if (timeCommitment.length > 0) {
      const bucket = getTimeCommitmentBucket(opp)
      if (!timeCommitment.includes(bucket)) return false
    }
    if (category.length > 0 && opp.category) {
      if (!category.includes(opp.category)) return false
    }
    if (locationType.length > 0 && opp.locationType) {
      if (!locationType.includes(opp.locationType)) return false
    }
    if (organizationType.length > 0 && opp.organizationType) {
      if (!organizationType.includes(opp.organizationType)) return false
    }
    if (difficulty.length > 0 && opp.difficulty) {
      if (!difficulty.includes(opp.difficulty)) return false
    }
    return true
  })
}
