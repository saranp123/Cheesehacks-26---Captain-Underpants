/**
 * MVP recommendation scoring for opportunities.
 * Score = +2 per matching skill, +1 time match, +1 category interest, +1 if New/Urgent.
 * Match percentage is normalized to 0–100 for display.
 */

const MAX_SCORE_PER_SKILL = 2
const SCORE_TIME_MATCH = 1
const SCORE_CATEGORY_INTEREST = 1
const SCORE_NEW_OR_URGENT = 1

/**
 * Normalize user preferred time to comparable form (e.g. "1 hour" -> 60).
 * Task time can be time_estimate (minutes) or timeEstimate string.
 */
function normalizePreferredTime(preferred) {
  if (!preferred || preferred === 'Flexible') return null
  const lower = String(preferred).toLowerCase()
  if (lower.includes('30') || lower.includes('30 mins')) return 30
  if (lower.includes('1 hour') || lower === '1 hour') return 60
  if (lower.includes('2') || lower.includes('3') || lower.includes('2–3')) return 150
  return null
}

/**
 * Get task time in minutes for comparison.
 */
function taskTimeMinutes(task) {
  if (task.time_estimate != null) return task.time_estimate
  const s = task.timeEstimate || ''
  if (/^\d+\s*min/.test(s)) return parseInt(s, 10)
  if (/^\d+\s*hour/.test(s) || s.includes('1 hour')) return 60
  if (/\d+\.\d+\s*hr/.test(s)) return Math.round(parseFloat(s) * 60)
  if (/\d+\s*hr/.test(s)) return parseInt(s, 10) * 60
  if (/2–3 hours?/.test(s) || /2-3 hours?/.test(s)) return 150
  return null
}

/**
 * Check if task time is "close enough" to user preferred time (within same bucket).
 */
function timeMatches(userPreferred, taskMinutes) {
  const preferredMins = normalizePreferredTime(userPreferred)
  if (preferredMins == null || taskMinutes == null) return false
  const buckets = [30, 60, 150]
  const userBucket = buckets.find(b => b >= preferredMins) || 150
  const taskBucket = buckets.find(b => b >= taskMinutes) || 150
  return userBucket === taskBucket
}

/**
 * Compute recommendation score for one opportunity.
 * @param {Object} opportunity - task/opportunity
 * @param {Object} userProfile - { skills, interests (categories), preferredTime }
 * @returns {{ score: number, matchPercentage: number }}
 */
export function getRecommendationScore(opportunity, userProfile) {
  const skills = userProfile?.skills || []
  const interests = userProfile?.interests || []
  const preferredTime = userProfile?.preferredTime

  const requiredSkills = opportunity.required_skills || []
  const matchingSkills = requiredSkills.filter((s) => skills.includes(s))
  let score = matchingSkills.length * MAX_SCORE_PER_SKILL

  const taskMins = taskTimeMinutes(opportunity)
  if (preferredTime && timeMatches(preferredTime, taskMins)) {
    score += SCORE_TIME_MATCH
  }

  const category = opportunity.category
  if (category && interests.includes(category)) {
    score += SCORE_CATEGORY_INTEREST
  }

  const badges = opportunity.badges || []
  const isNewOrUrgent = opportunity.isNew || opportunity.isUrgent ||
    badges.some((b) => /new|urgent|quick/i.test(String(b)))
  if (isNewOrUrgent) {
    score += SCORE_NEW_OR_URGENT
  }

  // Max possible: skills (e.g. 4*2) + 1 + 1 + 1 = 11; use 10 as cap for percentage
  const maxScore = Math.max(10, requiredSkills.length * MAX_SCORE_PER_SKILL + 4)
  const matchPercentage = Math.min(100, Math.round((score / maxScore) * 100))

  return { score, matchPercentage }
}

/**
 * Sort opportunities by recommendation score (descending).
 * Attaches score and matchPercentage to each item.
 */
export function sortByRecommendation(opportunities, userProfile) {
  const withScores = opportunities.map((opp) => {
    const { score, matchPercentage } = getRecommendationScore(opp, userProfile)
    return { ...opp, _recommendationScore: score, _matchPercentage: matchPercentage }
  })
  return withScores.sort((a, b) => (b._recommendationScore ?? 0) - (a._recommendationScore ?? 0))
}
