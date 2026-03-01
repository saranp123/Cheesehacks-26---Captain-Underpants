# KINDR – Micro-Volunteering Platform

**Empowering Communities Through Small Acts of Sustainable Impact**

---

## Overview

KINDR is a modern micro-volunteering platform that connects passionate volunteers with flexible, short-term opportunities from nonprofits. By breaking volunteering into bite-sized, skill-based tasks, KINDR makes civic engagement accessible to everyone—regardless of schedule or experience.

---

## The Problem

### Community Challenge
Many communities struggle with volunteer participation and sustaining long-term social initiatives. Traditional volunteering creates barriers:

- **High Time Commitment**: Volunteering opportunities often require multi-hour shifts or ongoing commitments, making participation impossible for busy students, professionals, and families.
- **Accessibility Gap**: People want to contribute but lack opportunities that fit their schedules, skills, and availability.
- **Nonprofit Strain**: Nonprofits spend valuable resources recruiting and managing volunteers for tasks that could be completed in micro-commitments.
- **Sustainability Crisis**: Short-term, inconsistent volunteer participation makes it difficult for nonprofits to sustain programs and plan long-term initiatives.

### Direct Impact
This creates a **sustainability gap**:
- Community programs suffer from irregular volunteer support
- Student volunteers feel excluded due to time constraints
- Nonprofits cannot grow and sustain mission-critical work

---

## The Solution

### How KINDR Works

KINDR bridges this gap by creating a **sustainable micro-volunteering ecosystem**:

#### For Volunteers
- **Flexible Opportunities**: Complete tasks in 30 minutes to 2 hours that fit your schedule
- **Skill Matching**: Find opportunities that match your abilities and interests
- **Impact Tracking**: See real-time impact of your contributions
- **Role-Based Experience**: Tailored interfaces for students, professionals, and community members

#### For Nonprofits
- **Flexible Task Creation**: Post micro-tasks that can be completed by volunteers in short timeframes
- **Volunteer Management**: Access to a pool of engaged, vetted volunteers
- **Sustainability**: Build reliable volunteer programs with predictable, manageable tasks
- **Impact Measurement**: Track volunteer hours, tasks completed, and community outcomes

### Why It Matters
By enabling **small acts of impact**, KINDR creates a sustainable model for:
- **Community Resilience**: Regular volunteer participation sustains programs year-round
- **Social Good**: Nonprofits accomplish mission-critical work with reliable support
- **Civic Engagement**: Makes volunteering accessible to everyone, regardless of schedule
- **Environmental & Social Sustainability**: Supports nonprofits focused on education, environment, community health, and social justice

---

## Tools and Technologies Used

### Frontend
- **React.js** – Modern UI framework with hooks for state management
- **Tailwind CSS** – Responsive, utility-first styling
- **Vite** – Lightning-fast build tool and dev server
- **Axios / Fetch** – API communication
- **React Router** – Client-side routing
- **Lucide React** – Icon library

### Backend
- **Spring Boot** – Java-based REST API framework
- **Maven** – Dependency management and build automation
- **REST API** – RESTful endpoint design

### Additional
- **Firebase** – Authentication and real-time database (optional)
- **Recharts / Chart.js** – Impact data visualization

---

## Project Structure Overview

```
kindr/
├── frontend/           # React SPA for volunteers and organizations
│   ├── src/
│   │   ├── pages/     # Main pages (Feed, Profile, Impact, Messaging)
│   │   ├── components/# Reusable UI components
│   │   ├── user/      # Volunteer-specific views
│   │   ├── organization/ # Organization-specific views
│   │   ├── context/   # React Context for auth and state
│   │   ├── api/       # API client and endpoints
│   │   └── styles/    # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/           # Spring Boot REST API
│   ├── src/
│   │   ├── main/java/com/kindr/
│   │   │   ├── controllers/ # API endpoints
│   │   │   ├── services/    # Business logic
│   │   │   ├── models/      # Entity models
│   │   │   └── KindrApplication.java # Main entry point
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│   └── README.md
│
├── data/              # Seed data and fixtures
├── scripts/           # Utility scripts
├── README.md          # This file
└── KINDR.code-workspace
```

---

## How to Run the Project

### Prerequisites
- Node.js 16+ (for frontend)
- Java 11+ and Maven (for backend)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

**Frontend runs at**: `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Build and run with Maven
mvn spring-boot:run

# Or run the packaged JAR
mvn clean package
java -jar target/kindr-app.jar
```

**Backend API available at**: `http://localhost:8080/api`

---

## Key Features

### For Volunteers
- ✅ Discover micro-volunteering opportunities filtered by skills, time, and interests
- ✅ Apply to tasks and track impact with real-time statistics
- ✅ View personalized volunteer profile with badges and achievements
- ✅ Message organizations directly about opportunities
- ✅ Match score algorithm recommends best-fit tasks

### For Organizations
- ✅ Post flexible micro-tasks with skill requirements and time estimates
- ✅ View suggested volunteers matched to opportunities
- ✅ Manage applications and in-app communications
- ✅ Track volunteer impact and organizational metrics
- ✅ Build sustainable volunteer pipelines

### Platform-Wide
- 🛡️ Role-based authentication (Volunteer vs Organization)
- 📊 Real-time impact dashboard with visualizations
- 💬 In-app messaging system
- 📱 Responsive, mobile-friendly design
- ♿ Accessibility-first UI patterns

---

## Key Endpoints

### Opportunities
```
GET  /api/opportunities              # Get all opportunities
GET  /api/opportunities/{id}         # Get single opportunity
POST /api/opportunities              # Create new opportunity
POST /api/opportunities/{id}/complete # Mark opportunity completed
```

### Users & Organizations
```
GET /api/users/{id}                  # Get user profile
GET /api/organizations/{id}          # Get organization profile
GET /api/organizations/{id}/volunteers # Get org's connected volunteers
```

### Matching & Impact
```
GET /api/match/{userId}/{opportunityId} # Get match percentage
GET /api/impact/user/{userId}        # Get user impact data
GET /api/impact/org/{orgId}          # Get organization impact data
```

### Applications
```
POST /api/applications               # Create application/claim task
GET  /api/applications/{userId}      # Get user's applications
```

---

## Future Improvements

- 🎯 **Advanced Matching Algorithm**: ML-based volunteer-opportunity matching
- 📅 **Calendar Integration**: Sync tasks with Google Calendar, Outlook
- 🏆 **Gamification**: Leaderboards, achievement badges, milestone rewards
- 🌍 **Location-Based Filtering**: Map view of nearby opportunities
- 📧 **Email Notifications**: Real-time alerts for new matches and updates
- 🔐 **Enhanced Security**: OAuth2, role-based access control (RBAC)
- 📈 **Advanced Analytics**: Detailed impact reports for nonprofits
- 🌐 **Internationalization**: Multi-language support for global communities
- 🤖 **Automated Scheduling**: Smart task assignment based on availability
- 🎓 **Skill Development Paths**: Guided volunteer career progression

---

## Getting Started Quickly

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kindr.git
   cd kindr
   ```

2. **Start the backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Demo login: `demo@kindr.demo` / `KindrDemo@2026`

---

## Frequently Asked Questions

**Q: What makes KINDR different from other volunteer platforms?**  
A: KINDR focuses on micro-volunteering with flexible 30-min to 2-hour tasks, making volunteering accessible to everyone. We emphasize sustainability for nonprofits through reliable, manageable volunteer pipelines.

**Q: Can I post tasks as a nonprofit?**  
A: Yes! After signing up as an organization, you can post opportunities from the Post Opportunity form. KINDR will match you with volunteers based on skills and availability.

**Q: How is impact tracked?**  
A: Volunteers earn hours credits for completed tasks. Organizations track volunteer contributions, task completion rates, and aggregate impact through dashboards.

**Q: Is KINDR free?**  
A: KINDR is free for both volunteers and nonprofits to use.

---

## Contributors

- **Team Kindr** – Original architects and developers
- **Community Contributors** – Welcome pull requests and feedback!

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact & Support

- 📧 **Email**: hello@kindr.community
- 🌐 **Website**: www.kindr.community
- 💬 **Issues & Feedback**: GitHub Issues

---

**Made with ❤️ for communities that transform through action.**
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
