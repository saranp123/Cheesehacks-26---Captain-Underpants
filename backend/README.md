# KINDR Backend

Spring Boot API for the KINDR micro-volunteering app. Uses in-memory mock data (no database).

## Run

From the repo root:

```bash
cd backend
mvn spring-boot:run
```

Server runs at **http://localhost:8080**.

**If "Run" in the IDE fails with "SpringApplication cannot be resolved"**: the IDE is not using Maven’s classpath. Either run with the command above, or use **Terminal → Run Task → Run KINDR Backend**. To fix Run/Debug in the IDE, open the `backend` folder (where `pom.xml` is), then **Java: Clean Java Language Server Workspace** and reload so the Maven project is picked up.

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
