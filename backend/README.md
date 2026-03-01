# KINDR Backend

Spring Boot API for the KINDR micro-volunteering app. Uses in-memory mock data (no database).

**If the IDE says "non-project file"**: open **File → Open Workspace from File…** and choose `KINDR.code-workspace` in the repo root so the backend is loaded as a Maven project.

## Run

From the repo root:

```bash
cd backend
mvn spring-boot:run
```

Server runs at **http://localhost:8080**.

**If "Run" in the IDE fails with "SpringApplication cannot be resolved"**: the IDE is not using Maven’s classpath. Do **one** of the following: (1) Run from terminal with the command above, or **Terminal → Run Task → Run KINDR Backend**. (2) **Java: Clean Java Language Server Workspace** (Command Palette), then **Reload Window**, so the `backend` Maven project is loaded; then Run again.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users/{id}` | Volunteer profile |
| GET | `/api/organizations/{id}` | Organization profile |
| GET | `/api/opportunities` | All volunteering opportunities |
| POST | `/api/opportunities` | Create opportunity (body: `orgId`, `title`, `requiredTags`, `requiredSkills`) |
| GET | `/api/match/{userId}/{opportunityId}` | Fit score 0–100 (values + skills match) |

## CORS

All controllers allow `http://localhost:3000` for the React frontend.

## Sample Data

- **Users**: ids 1–3 (e.g. Alex Chen, Sam Rivera, Jordan Lee)
- **Organizations**: ids 1–3 (Green Earth, Community Learning Hub, Paws & Claws)
- **Opportunities**: ids 1–3 (beach cleanup, tutoring, social media)

Example: `GET /api/match/1/1` returns fit score for user 1 and opportunity 1.
