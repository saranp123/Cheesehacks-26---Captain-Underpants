# Kindr – Micro-Volunteering MVP

Kindr is a micro-volunteering app for **high school & college students** and **nonprofit organizations**. Find short tasks, claim them, track impact, post opportunities, and message volunteers.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Recharts, Lucide React
- **Auth / Data:** Firebase (optional). Works **without Firebase** using placeholder data for a quick local demo.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**.

### Demo login (no Firebase)

- Use **Log in** (no signup needed).
- Email: `demo@kindr.demo` / Password: `demo123`.
- Toggle **"I'm an organization"** to switch between **volunteer** and **org** views.

### Optional: Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password) and **Firestore**.
3. In `frontend`, create `.env` from `.env.example` and add your Firebase config.

---

## Frontend features (MVP)

| Feature | Description |
|--------|-------------|
| **User feed** | Task cards with title, org, category, skills, time estimate, badges; Claim/Complete; filters by category & skills |
| **Org feed** | Posted tasks, volunteer list (name, skills, tasks completed, availability, badges), Message, filters |
| **Impact** | **Org:** total volunteers/hours/tasks, hours per activity, top volunteers, growth chart. **Person:** total hours, tasks, badges, activity & category breakdown, growth chart |
| **Profiles** | Person: name, avatar, skills, badges, tasks completed, volunteer hours. Org: name, logo, posted tasks, volunteers |
| **Post opportunity** | Title, description, required skills, category, time estimate, optional badges; validation; Firebase or in-memory |
| **Messaging** | Messages & notifications page; notification bell in header |
| **Auth** | Login/signup (Firebase or demo); person vs organization flows |

## Project structure

```
frontend/
  src/
    organization/    # Org feed, org impact, org profile, post opportunity
    user/            # User feed, person impact, person profile
    pages/           # Impact (router), MessagingPage, Login
    components/      # Layout, Header, TaskCard, FilterBar, MessageCard, NotificationBell
    context/         # AuthContext
    data/placeholders.js
    firebase/        # config, tasks (optional)
    api/client.js    # Optional API client (when VITE_API_URL set)
    utils/notifications.js
```

## Build for production

```bash
cd frontend
npm run build
npm run preview
```

Deploy `frontend/dist` to Vercel or Netlify.

---

Built for hackathon demo. Frontend only; use React functional components and hooks.
