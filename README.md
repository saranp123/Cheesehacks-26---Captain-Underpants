# Kindr – Micro-Volunteering MVP

Kindr is a **full-stack** micro-volunteering app for **high school & college students** and **nonprofit organizations**. Find short tasks, claim them, track impact, post opportunities, and message volunteers.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Recharts, Lucide React
- **Backend:** Node.js + Express (in-memory store for demo; no MongoDB required)
- **Auth / Data:** Firebase (optional). Works **without Firebase** using placeholder data, or point frontend to the Kindr API with `VITE_API_URL`.

## Run locally (full-stack)

### 1. Backend

```bash
cd backend
npm install
npm start
```

API runs at **http://localhost:3001**. Uses in-memory data (no database setup).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**.

### 3. Use the API from the frontend (optional)

In `frontend`, create `.env`:

```env
VITE_API_URL=http://localhost:3001
```

Restart `npm run dev`. Impact and messaging pages will fetch from the API when available; task list can be extended to use it too.

### 4. Demo login (no Firebase)

- Use **Log in** (no signup needed).
- Email: `demo@kindr.demo` / Password: `demo123`.
- Toggle **"I'm an organization"** to switch between **volunteer** and **org** views.

---

## Backend API (Node.js)

| Area | Endpoints |
|------|-----------|
| **Users** | `GET/POST /users`, `GET/PUT /users/:id`, `GET /users/:id/tasks` |
| **Organizations** | `GET/POST /organizations`, `GET/PUT /organizations/:id`, `GET /organizations/:id/volunteers` |
| **Tasks** | `GET/POST /tasks`, `PUT/DELETE /tasks/:id`, `POST /tasks/:id/claim`, `POST /tasks/:id/complete` |
| **Impact** | `GET /impact/org/:id`, `GET /impact/user/:id` |
| **Messaging** | `POST /messages`, `GET /notifications/:userId` |

Health: `GET http://localhost:3001/health`.

---

## Frontend features (MVP)

| Feature | Description |
|--------|-------------|
| **User feed** | Task cards with title, org, category, skills, time estimate, badges; Apply/Complete/View Org; filters by category & skills |
| **Org feed** | Posted tasks, volunteer list (name, skills, tasks completed, availability, badges), Message / Notify Suggested User, filters |
| **Impact** | **Org:** total volunteers/hours/tasks, hours per activity, top volunteers, growth chart. **Person:** total hours, tasks, badges, activity & category breakdown, growth chart |
| **Profiles** | Person: name, avatar, skills, badges, tasks completed, volunteer hours. Org: name, logo, posted tasks, volunteers |
| **Post opportunity** | Title, description, required skills, category, time estimate, optional badges; validation; submits to Firebase or API |
| **Messaging** | Messages & notifications page; notification bell in header; task suggestions and approvals (placeholder/API) |
| **Auth** | Login/signup (Firebase or demo); person vs organization flows |

## Project structure

```
backend/
  data/store.js      # In-memory store + seed data
  routes/            # users, organizations, tasks, impact, messages
  index.js           # Express app, CORS
  package.json

frontend/
  src/
    api/client.js    # Optional API client (when VITE_API_URL set)
    components/      # Layout, Header, TaskCard, FilterBar, MessageCard, NotificationBell
    context/         # AuthContext
    data/placeholders.js
    firebase/        # config, tasks (optional)
    pages/           # UserFeed, OrgFeed, Impact (→ OrgImpactPage / PersonImpactPage),
                     # ProfilePerson, ProfileOrg, PostOpportunity, MessagingPage, Login
    utils/notifications.js
```

## Build for production

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

Deploy `frontend/dist` to Vercel or Netlify.

**Backend:** For production, replace the in-memory store with MongoDB or PostgreSQL and add auth (e.g. JWT or Firebase Admin).

---

Built for hackathon demo. Use React functional components and hooks; backend runs with `npm start` for immediate demo without a database.
