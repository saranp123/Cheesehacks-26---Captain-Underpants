# KINDR Frontend

Modern React-based SPA for the KINDR micro-volunteering platform. Provides role-based interfaces for volunteers and nonprofit organizations.

## Overview

The KINDR frontend is a responsive, single-page application built with React that connects volunteers to flexible micro-volunteering opportunities. It features real-time state management, optimistic UI updates, and a role-based architecture supporting both volunteer and organization workflows.

---

## Architecture

### Role-Based UI

The frontend dynamically renders different interfaces based on user type:

**Volunteer View**
- Discover opportunities feed with smart matching
- Apply to tasks and track personal impact
- View volunteer profile and badges
- Message organizations

**Organization View**
- Main feed with task management
- Post new opportunities
- View suggested and applied volunteers
- Manage volunteer communications
- Track organizational impact

---

## Pages & Components

### Core Pages

| Page | Route | Description |
|------|-------|-------------|
| **User Feed** | `/feed` | Volunteer discovery page with filters, match scores, and Apply button |
| **Organization Feed** | `/org/feed` | Org dashboard with opportunities, suggested volunteers, and applications |
| **User Profile** | `/profile` | Volunteer profile with editable name, skills, about, experiences, and resume |
| **Organization Profile** | `/org/profile` | Organization profile with editable mission, biography, and values |
| **Post Opportunity** | `/post` | Form to create micro-volunteering tasks with side-by-side live preview |
| **Impact Dashboard** | `/impact` | Real-time impact stats, charts, and volunteer/organization metrics |
| **Messaging** | `/messages` & `/org/messages` | In-app chat system for volunteer-organization communication |
| **Login** | `/login` | Authentication with demo credentials and role selection |

### Key Components

| Component | Purpose |
|-----------|---------|
| `OpportunityListItem` | Task card with title, org, skills, match score, Apply button |
| `Filters` | Multi-select dropdown for category, skills, time, location filters |
| `Header` | Navigation bar with branding and user menu |
| `Layout` | Main page wrapper with header and routing |
| `TaskCard` | Reusable opportunity display card |
| `MessageCard` | Chat message bubble UI |
| `NotificationBell` | Unread notification indicator |
| `ImpactSnapshot` | Stats cards showing volunteer hours, tasks, badges |

---

## Technology Stack

### Core
- **React 18** – Component-based UI with hooks (useState, useEffect, useContext, useRef)
- **React Router v6** – Client-side routing with nested routes
- **Vite** – Lightning-fast build tool and dev server

### Styling
- **Tailwind CSS** – Utility-first CSS framework
- **Lucide React** – Icon library for UI elements

### API Communication
- **Axios / Fetch API** – HTTP client for backend requests
- **async/await** – Promise handling with error boundaries

### State Management
- **React Context** – AuthContext for user authentication and profile
- **useState** – Local component state
- **useMemo** – Optimized filtering and sorting

### Data Visualization
- **Recharts** – Charts for impact data (optional)

---

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── client.js              # API endpoints and HTTP utilities
│   ├── components/
│   │   ├── Header.jsx             # Navigation bar
│   │   ├── Layout.jsx             # Main layout wrapper
│   │   ├── FilterBar.jsx          # Filter UI
│   │   ├── TaskCard.jsx           # Task/opportunity card
│   │   ├── MessageCard.jsx        # Chat message UI
│   │   └── NotificationBell.jsx   # Notifications
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication and user state
│   ├── data/
│   │   └── placeholders.js        # Mock data for demo
│   ├── pages/
│   │   ├── Login.jsx              # Login/signup page
│   │   ├── Impact.jsx             # Impact dashboard
│   │   └── MessagingPage.jsx      # Messaging interface
│   ├── user/
│   │   ├── UserFeed.jsx           # Volunteer opportunity feed
│   │   ├── ProfilePerson.jsx      # Volunteer profile (editable)
│   │   ├── UserFeed/
│   │   │   ├── Filters.jsx
│   │   │   ├── OpportunityListItem.jsx
│   │   │   └── RecommendationUtils.js
│   │   └── UserOrganizationProfilePage.jsx
│   ├── organization/
│   │   ├── OrgMainFeed.jsx        # Organization dashboard
│   │   ├── PostOpportunity.jsx    # Create task form with live preview
│   │   ├── ProfileOrg.jsx         # Organization profile (editable)
│   │   ├── OrgMessagesPage.jsx    # Organization messaging
│   │   ├── OrgFeed/
│   │   │   ├── Filters.jsx
│   │   │   └── VolunteerCard.jsx
│   │   └── Profile/
│   │       ├── OrgHeroSection.jsx
│   │       ├── MissionValuesSection.jsx
│   │       ├── ImpactSnapshot.jsx
│   │       └── VolunteerHighlights.jsx
│   ├── styles/
│   │   └── globals.css            # Global Tailwind styles
│   ├── utils/
│   │   ├── matchLogic.js          # Volunteer-opportunity matching
│   │   └── notifications.js       # Notification utilities
│   ├── App.jsx                    # Main app component with routes
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Base styles
├── .env.example                   # Environment variables template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or npm

### Local Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at **http://localhost:3000**

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Environment Variables

Create a `.env` file from `.env.example`:

```env
# Backend API URL
VITE_API_URL=http://localhost:8080/api

# Firebase (optional)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## API Integration

The frontend communicates with the backend at `http://localhost:8080/api`.

### Key API Calls

**Opportunities**
```javascript
GET /api/opportunities              // Get all opportunities
POST /api/applications              // Apply for opportunity
POST /api/opportunities             // Create new opportunity
```

**Users & Organizations**
```javascript
GET /api/users/{id}                 // Get user profile
GET /api/organizations/{id}         // Get organization profile
```

**Matching**
```javascript
GET /api/match/{userId}/{oppId}     // Get match percentage
```

**Messaging**
```javascript
POST /api/messages                  // Send message
GET /api/notifications/{userId}     // Get notifications
```

---

## Features

### Volunteer Experience
- ✅ Discover opportunities with intelligent filtering
- ✅ Real-time match scoring (0-100%)
- ✅ Apply to tasks with one click
- ✅ Track hours and impact in real-time
- ✅ Editable profile with skills and resume
- ✅ Messaging with organizations
- ✅ Achievement badges and recognition

### Organization Experience
- ✅ Post micro-tasks with side-by-side live preview
- ✅ See suggested volunteers with skill matching
- ✅ View applications and manage opportunities
- ✅ Message volunteers directly
- ✅ Track organizational impact and metrics
- ✅ Editable organization profile

### Platform Features
- ✅ Role-based authentication (volunteer vs org)
- ✅ Responsive mobile-first design
- ✅ Real-time UI updates with optimistic rendering
- ✅ Error handling and rollback on API failures
- ✅ Loading states for async operations
- ✅ Accessibility-first component design

---

## Demo Credentials

**Volunteer**
- Email: `demo@kindr.demo`
- Password: `KindrDemo@2026`

**Organization**
- Email: `demo@kindr.demo`
- Password: `KindrDemo@2026`
- Toggle "I'm an organization" checkbox

---

## Development Guidelines

### Component Structure
```jsx
// Functional components with hooks
export default function ComponentName() {
  const [state, setState] = useState(initialValue)
  
  useEffect(() => {
    // Side effects
  }, [dependencies])
  
  return <div>JSX here</div>
}
```

### API Calls Pattern
```jsx
useEffect(() => {
  let cancelled = false
  
  const fetchData = async () => {
    try {
      const response = await apiFunction()
      if (!cancelled) setData(response)
    } catch (err) {
      if (!cancelled) setError(err)
    }
  }
  
  fetchData()
  return () => { cancelled = true }
}, [dependencies])
```

### Error Handling
- Try/catch for async operations
- Rollback on API failures (optimistic UI)
- User-friendly error messages
- Loading states during requests

---

## Styling Guidelines

Uses **Tailwind CSS** utility classes:

- **Colors**: Primary (kindr-primary), secondary (kindr-secondary), slate palette
- **Spacing**: gap-2, gap-4, p-4, m-4 patterns
- **Typography**: text-3xl (headers), text-lg (subheaders), text-sm (details)
- **Cards**: rounded-2xl, border border-slate-200, shadow-sm, hover:shadow-md
- **Responsive**: sm:, lg: breakpoints for mobile-first design

---

## Troubleshooting

**Frontend won't connect to backend?**
- Check VITE_API_URL in .env
- Ensure backend is running on http://localhost:8080
- Verify CORS is configured on backend

**Hot reload not working?**
- Restart `npm run dev`
- Check vite.config.js configuration

**Build errors?**
- Delete `node_modules` and `.next`
- Run `npm install` again
- Check Node version (16+)

---

## Resources

- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

---

**Frontend maintained by Team Kindr**
