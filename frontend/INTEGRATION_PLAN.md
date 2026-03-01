# Frontend–Backend Integration Plan

**Backend base URL:** `http://localhost:8080/api`  
**API contract (as specified):**
- `GET /opportunities` → array of opportunity objects
- `POST /opportunities` → create opportunity (JSON body)
- `GET /users/{id}` → user profile object
- `GET /match/{userId}/{opportunityId}` → match score object

**Backend response shapes (Java):**
- **Opportunity:** `{ id, orgId, title, requiredTags, requiredSkills }` (no description, category, timeEstimate)
- **User:** `{ id, name, alignmentTags, skills }` (no volunteer_hours, badges, completed_tasks)
- **Match:** `{ userId, opportunityId, fitScore, message }`
- **Organization:** `{ id, name, focusAreas }`

---

## Files to change (audit summary)

| File | Current data source | Change |
|------|---------------------|--------|
| **api/client.js** | N/A | Add response normalizers (backend → UI shape), throw on `!res.ok` for error handling, ensure `Content-Type: application/json` on POST (already present). |
| **user/UserFeed.jsx** | `PLACEHOLDER_TASKS`, `USER_FEED_PROFILE` | Replace with `useEffect` + `getOpportunities()`. Add `isLoading`, `error` state. Normalize list for UI (e.g. `required_skills` from `requiredSkills`). Keep `USER_FEED_PROFILE` for recommendation sort; optionally use `getMatch(userId, oppId)` for scores if we have `profile?.id`. |
| **organization/OrgFeed.jsx** | `fetchTasks()` (Firebase/placeholders), `PLACEHOLDER_VOLUNTEERS`, `MOCK_APPLICATIONS` | Replace task source with `getOpportunities()` from API; filter by `profile?.orgId` client-side. Add `error` state. Keep volunteers/applications as mock (no backend endpoints). |
| **organization/PostOpportunity.jsx** | Already uses `createOpportunity()` | Align POST body with backend: send only `orgId`, `title`, `requiredTags`, `requiredSkills`. Add success/error UI (message or toast) and reset form on success. |
| **user/ProfilePerson.jsx** | Already uses `getUser(id)` | Add explicit loading and error UI. Map backend user (`alignmentTags`, `skills`) to display; tolerate missing `volunteer_hours`/`badges`. |
| **organization/VolunteerProfileView.jsx** | `PLACEHOLDER_VOLUNTEERS.find(id)` | Fetch volunteer via `getUser(id)` in `useEffect`. Add `isLoading`, `error`. Map backend user shape to component props. |
| **user/UserOpportunityDetailPage.jsx** | `PLACEHOLDER_TASKS.find(id)` | Fetch `getOpportunities()` in `useEffect`, find opportunity by `id`. Add `isLoading`, `error`. Normalize for UI (e.g. `required_skills`, optional `description`). |
| **organization/OrganizationProfilePage.jsx** | `ORGANIZATIONS_BY_ID[id]`, `PLACEHOLDER_TASKS` | Fetch org via `getOrg(id)` and opportunities via `getOpportunities()`; filter by `orgId`. Add loading/error. Show org name/focusAreas; opportunities use normalized shape. |

---

## 1. api/client.js

- **Keep** `base = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'`.
- **Ensure** all fetch requests use `Content-Type: application/json` where applicable (POST already does).
- **Throw** on `!res.ok` (e.g. `throw new Error(res.statusText)` or include status) so callers can `try/catch` and set `error` state.
- **Add** `normalizeOpportunity(backendOpp)` so backend `{ id, orgId, title, requiredTags, requiredSkills }` is mapped to UI shape: `required_skills` ← `requiredSkills`, `organizationId` ← `orgId`, `category` ← first of `requiredTags` or empty string, `organizationName` left empty unless we later resolve via `getOrg(orgId)`.
- **Optional:** Export a small `normalizeUser(backendUser)` for components that expect `skills` (already present), `volunteer_hours`/`badges` (default to 0 / []).

---

## 2. user/UserFeed.jsx

- **Remove** direct use of `PLACEHOLDER_TASKS` and use state: `opportunities`, `isLoading`, `error`.
- **Add** `useEffect`: call `getOpportunities()`, normalize each item with `normalizeOpportunity`, set state; on failure set `error`, in `finally` set `isLoading(false)`.
- **Keep** `USER_FEED_PROFILE` for `sortByRecommendation` and filters (no backend “current user profile” in scope for feed).
- **Render:** If `isLoading` show “Loading…” (or spinner). If `error` show error message. Else render list (empty state unchanged).

---

## 3. organization/OrgFeed.jsx

- **Replace** `fetchTasks({ organizationId: orgId })` with `getOpportunities()` from API; in the same effect, set `opportunityList` to normalized opportunities **filtered** by `opp.orgId === orgId` (backend returns all).
- **Add** `error` state; on failed fetch set `error` and show message.
- **Keep** `PLACEHOLDER_VOLUNTEERS` and `MOCK_APPLICATIONS` for suggested/applied volunteers (no backend for those yet).

---

## 4. organization/PostOpportunity.jsx

- **Payload:** Send only what backend accepts: `{ orgId: profile?.id, title, requiredTags: form.badges || [], requiredSkills: form.skills || [] }`. Omit `description`, `date`, `durationHours`, `category` (or send for future use; backend will ignore).
- **After** `createOpportunity(payload)`: on success set a short success message and reset form; on catch set `error` state and show “Failed to create opportunity”.
- **Keep** `saving` and disable submit while saving.

---

## 5. user/ProfilePerson.jsx

- **Already** uses `getUser(profile?.id)`. Ensure `getUser` uses backend (base URL already correct).
- **Map** backend user: `skills` ← `userData.skills`, `alignmentTags` can be shown as “Interests” or ignored; default `volunteer_hours` to 0, `badges` to [] if missing.
- **Show** loading spinner/message while `loading`; show error message if fetch fails (e.g. from catch).

---

## 6. organization/VolunteerProfileView.jsx

- **Replace** `PLACEHOLDER_VOLUNTEERS.find(id)` with state from API: `useEffect` calling `getUser(id)` (from route param), set `volunteer`, `isLoading`, `error`.
- **Map** backend user to component: `name`, `skills`; treat `alignmentTags` as optional; no `volunteer_hours`/`tasksCompleted`/`badges` from API — show 0 / [] or “—” where needed.
- **Render** loading and error states; “Volunteer not found” when !volunteer && !loading.

---

## 7. user/UserOpportunityDetailPage.jsx

- **Replace** `PLACEHOLDER_TASKS.find(id)` with: state `opportunity`, `isLoading`, `error`; `useEffect` calling `getOpportunities()`, then finding item where `opp.id === id`, normalizing and setting state.
- **If** not found after fetch, show “Opportunity not found” (and optional back link).
- **Normalize** so component still receives `required_skills`, `category`, etc. (description can be empty if backend doesn’t provide it).

---

## 8. organization/OrganizationProfilePage.jsx

- **Replace** `ORGANIZATIONS_BY_ID[id]` and `PLACEHOLDER_TASKS` with: `useEffect` calling `getOrg(id)` and `getOpportunities()`; set `org`, `opportunities`, `isLoading`, `error`.
- **Filter** opportunities by `orgId === id`.
- **Map** backend org: `name`, `focusAreas`; hero stats (totalVolunteers, totalHours, etc.) can stay placeholder or “—” since backend doesn’t provide them.
- **Render** loading and error; “Organization not found” when !org && !loading.

---

## CORS and headers

- Backend already allows `http://localhost:3000`; no change needed.
- All POST requests in `api/client.js` already send `Content-Type: application/json`. No additional header changes required.

---

## State management summary

| Component | New/updated state | Source |
|-----------|--------------------|--------|
| UserFeed | `opportunities`, `isLoading`, `error` | `getOpportunities()` |
| OrgFeed | `opportunityList` from API, `error` | `getOpportunities()` + filter by orgId |
| PostOpportunity | `error` (and existing `saving`) | `createOpportunity()` catch |
| ProfilePerson | existing `userData`, `loading`; add `error` | `getUser()` |
| VolunteerProfileView | `volunteer`, `isLoading`, `error` | `getUser(id)` |
| UserOpportunityDetailPage | `opportunity`, `isLoading`, `error` | `getOpportunities()` + find by id |
| OrganizationProfilePage | `org`, `opportunities`, `isLoading`, `error` | `getOrg(id)`, `getOpportunities()` |

---

## Optional (not in initial scope)

- **Match score:** In UserFeed, if `profile?.id` is available (e.g. from AuthContext with a known user id like `v_10485`), call `getMatch(profile.id, opp.id)` per opportunity and show backend `fitScore` instead of or in addition to client-side recommendation.
- **Organization name in feed:** Resolve `organizationName` by calling `getOrg(opp.orgId)` when displaying an opportunity (or batch in parent); currently plan keeps `organizationName` empty or derived from a local map to avoid N+1.

---

## Files not changed

- **data/placeholders.js** – Keep for constants (CATEGORIES, SKILLS_LIST, BADGES, etc.), filters, and any UI that still needs fallbacks or non-API data.
- **firebase/tasks.js** – Leave as-is for Firebase path; OrgFeed will call API client instead when using backend.
- **AuthContext.jsx** – No change; continues to provide `profile` (placeholder or Firebase). Use `profile?.id` where backend needs a user/org id.
- **RecommendationUtils.js**, **applyFilters.js**, **OpportunityListItem.jsx** – No change; they accept normalized opportunity shape.
- **OrgOpportunitiesSection.jsx** – Receives `opportunities` as props; parent (OrganizationProfilePage) will pass API-sourced, normalized list.

---

If this plan looks good, the next step is to apply the edits in the order above (client first, then feeds and pages).
