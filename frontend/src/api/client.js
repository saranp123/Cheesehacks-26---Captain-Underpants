/**
 * API client for Kindr backend (Node.js + Express).
 * Set VITE_API_URL in .env (e.g. http://localhost:3001) to use the backend instead of Firebase/placeholders.
 */

// default backend base URL for local development
const base = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export async function apiGet(path) {
  if (!base) return null
  const res = await fetch(`${base}${path}`)
  return res.ok ? res.json() : null
}

export async function apiPost(path, body) {
  if (!base) return null
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.ok ? res.json() : null
}

export async function apiPut(path, body) {
  if (!base) return null
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.ok ? res.json() : null
}

// Users
export const getUser = (id) => apiGet(`/users/${id}`)
export const getUsersTasks = (id) => apiGet(`/users/${id}/tasks`)

// Opportunities (server uses /opportunities)
export const getOpportunities = (query = {}) => {
  const params = new URLSearchParams(query).toString()
  return apiGet(`/opportunities${params ? `?${params}` : ''}`)
}
export const getOpportunity = (id) => apiGet(`/opportunities/${id}`)
export const createOpportunity = (body) => apiPost('/opportunities', body)

// Match / Fit score
// GET /match/{userId}/{opportunityId} -> expects { fitScore: number }
export const getMatch = (userId, opportunityId) => apiGet(`/match/${userId}/${opportunityId}`)

// Organizations
export const getOrg = (id) => apiGet(`/organizations/${id}`)
export const getOrgVolunteers = (id) => apiGet(`/organizations/${id}/volunteers`)

// Tasks
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
