/**
 * API client for Kindr backend (Java Spring Boot).
 * Set VITE_API_URL in .env (e.g. http://localhost:8080/api).
 */

const base = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function checkOk(res) {
  if (!res.ok) {
    const text = await res.text()
    let message = res.statusText
    try {
      const json = JSON.parse(text)
      if (json.error || json.message) message = json.error || json.message
    } catch (_) {}
    throw new Error(message || `Request failed: ${res.status}`)
  }
  return res
}

export async function apiGet(path) {
  if (!base) return null
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: 'application/json' },
  })
  await checkOk(res)
  return res.json()
}

export async function apiPost(path, body) {
  if (!base) return null
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  await checkOk(res)
  return res.json()
}

export async function apiPut(path, body) {
  if (!base) return null
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  await checkOk(res)
  return res.json()
}

/** Map backend opportunity to UI shape (required_skills, organizationId, category, etc.) */
export function normalizeOpportunity(opp) {
  if (!opp) return null
  const requiredSkills = opp.requiredSkills ?? opp.required_skills ?? []
  const requiredTags = opp.requiredTags ?? []
  return {
    ...opp,
    id: opp.id,
    orgId: opp.orgId,
    organizationId: opp.orgId,
    organizationName: opp.organizationName ?? '',
    title: opp.title,
    required_skills: requiredSkills,
    requiredTags,
    category: opp.category ?? (requiredTags[0] ?? ''),
    description: opp.description ?? '',
    time_estimate: opp.time_estimate ?? null,
    timeEstimate: opp.timeEstimate ?? (opp.time_estimate != null ? `${opp.time_estimate} min` : '—'),
    location: opp.location ?? '',
    locationType: opp.locationType ?? '',
  }
}

/** Map backend user to UI shape (skills; volunteer_hours/badges defaulted) */
export function normalizeUser(user) {
  if (!user) return null
  return {
    ...user,
    id: user.id,
    name: user.name,
    skills: user.skills ?? [],
    alignmentTags: user.alignmentTags ?? [],
    volunteer_hours: user.volunteer_hours ?? user.volunteerHours ?? 0,
    volunteerHours: user.volunteerHours ?? user.volunteer_hours ?? 0,
    badges: user.badges ?? [],
    completed_tasks: user.completed_tasks ?? [],
  }
}

// Users
export const getUser = (id) => apiGet(`/users/${id}`)
export const getUsersTasks = (id) => apiGet(`/users/${id}/tasks`)

// Opportunities
export const getOpportunities = (query = {}) => {
  const params = new URLSearchParams(query).toString()
  return apiGet(`/opportunities${params ? `?${params}` : ''}`)
}
export const getOpportunity = (id) => apiGet(`/opportunities/${id}`)
export const createOpportunity = (body) => apiPost('/opportunities', body)

// Match / Fit score
export const getMatch = (userId, opportunityId) => apiGet(`/match/${userId}/${opportunityId}`)

// Organizations
export const getOrg = (id) => apiGet(`/organizations/${id}`)
export const getOrgVolunteers = (id) => apiGet(`/organizations/${id}/volunteers`)

// Tasks (optional; backend may not implement)
export const getTasks = (query = {}) => {
  const params = new URLSearchParams(query).toString()
  return apiGet(`/tasks${params ? `?${params}` : ''}`)
}
export const createTaskApi = (body) => apiPost('/tasks', body)
export const claimTaskApi = (taskId, userId) => apiPost(`/tasks/${taskId}/claim`, { userId })
export const completeTaskApi = (taskId, userId, hours) => apiPost(`/tasks/${taskId}/complete`, { userId, hours })

// Impact
export const getOrgImpact = (orgId) => apiGet(`/impact/org/${orgId}`)
export const getUserImpact = (userId) => apiGet(`/impact/user/${userId}`)

// Notifications
export const getNotificationsApi = (userId) => apiGet(`/notifications/${userId}`)

// Messages
export const sendMessage = (senderId, recipientId, message) =>
  apiPost('/messages', { senderId, recipientId, message })
