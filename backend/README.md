# KINDR Backend

Spring Boot REST API for the KINDR micro-volunteering platform. Handles core business logic for opportunities, volunteers, organizations, matching, messaging, and impact tracking.

## Overview

The KINDR backend is a RESTful API built with Spring Boot that powers the micro-volunteering platform. It provides comprehensive endpoints for managing opportunities, connecting volunteers with organizations, handling applications and messaging, and tracking community impact.

---

## Architecture

### Technology Stack

- **Framework**: Spring Boot 2.x / 3.x
- **Language**: Java 11+
- **Build Tool**: Maven 3.6+
- **Database**: (MongoDB, MySQL, PostgreSQL - configurable)
- **REST API**: RESTful endpoints with JSON requests/responses
- **Authentication**: JWT or Session-based (configurable)

### Core Modules

| Module | Responsibility |
|--------|----------------|
| **Controllers** | HTTP request/response handling, routing, validation |
| **Services** | Business logic, algorithms, data processing |
| **Models** | Entity definitions, data structures, JPA mappings |
| **Repositories** | Database abstraction, CRUD operations |
| **Utilities** | Helpers, validators, constants |

---

## Installation & Setup

### Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- MySQL, PostgreSQL, or MongoDB (configurable)

### Local Development

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Build and run the Spring Boot application
mvn spring-boot:run
```

Backend API runs at **http://localhost:8080/api**

---

## Configuration

### Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/kindr
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration (if using JWT)
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.max-age=3600

# Logging
logging.level.root=INFO
logging.level.com.kindr=DEBUG
```

---

## Key API Endpoints

### Opportunities

**Get All Opportunities**
```
GET /api/opportunities
Query Parameters: category, skills, timeCommitment, locationType
Response: List of opportunities with organization details
```

**Get Single Opportunity**
```
GET /api/opportunities/{id}
Response: Opportunity object with full details
```

**Create Opportunity**
```
POST /api/opportunities
Request Body:
{
  "title": "Tutor Math for 1 Hour",
  "description": "Help middle school students with algebra",
  "requiredSkills": ["Teaching", "Math"],
  "category": "Education",
  "durationMinutes": 60,
  "orgId": "org_001",
  "organizationName": "Learning Lab"
}
Response: Created opportunity object
```

**Mark Opportunity Complete**
```
POST /api/opportunities/{id}/complete
Request Body:
{
  "userId": "v_001",
  "hoursSpent": 1
}
Response: Updated opportunity and impact data
```

### Users

**Get User Profile**
```
GET /api/users/{id}
Response: User object with skills, hours, badges, completed tasks
```

**Update User Profile**
```
PUT /api/users/{id}
Request Body: User object with editable fields
Response: Updated user object
```

### Organizations

**Get Organization Profile**
```
GET /api/organizations/{id}
Response: Organization object with mission, values, opportunities
```

**Get Organization's Volunteers**
```
GET /api/organizations/{id}/volunteers
Response: List of volunteers who applied to organization's opportunities
```

**Update Organization Profile**
```
PUT /api/organizations/{id}
Request Body: Organization object with editable fields
Response: Updated organization object
```

### Matching & Recommendations

**Get Match Score**
```
GET /api/match/{userId}/{opportunityId}
Response:
{
  "userId": "v_001",
  "opportunityId": "opp_001",
  "matchPercentage": 85,
  "matchFactors": {
    "skillsMatch": 90,
    "timeMatch": 80,
    "categoryMatch": 100,
    "availability": 70
  }
}
```

### Impact Tracking

**Get User Impact**
```
GET /api/impact/user/{userId}
Response:
{
  "userId": "v_001",
  "totalHours": 42,
  "tasksCompleted": 15,
  "badges": ["First Step", "Top Volunteer"],
  "hoursByCategory": {"Education": 20, "Environment": 22}
}
```

**Get Organization Impact**
```
GET /api/impact/org/{orgId}
Response:
{
  "orgId": "org_001",
  "totalVolunteers": 25,
  "totalHours": 150,
  "tasksCompleted": 45,
  "topVolunteers": [...]
}
```

### Applications

**Create Application (Apply for Task)**
```
POST /api/applications
Request Body:
{
  "userId": "v_001",
  "opportunityId": "opp_001"
}
Response: Application object with status "applied"
```

**Get User's Applications**
```
GET /api/applications/{userId}
Response: List of user's applications with status and details
```

### Messaging

**Send Message**
```
POST /api/messages
Request Body:
{
  "senderId": "v_001",
  "recipientId": "org_001",
  "messageText": "I'm interested in this opportunity!",
  "opportunityId": "opp_001"
}
Response: Message object with timestamp
```

**Get Conversation**
```
GET /api/messages/{senderId}/{recipientId}
Response: List of messages between two users, chronologically ordered
```

---

## Core Services Explained

### MatchingService
Calculates compatibility between volunteers and opportunities based on:
- Skill overlap
- Time commitment availability
- Category interests
- Location preferences
- Previous volunteer experience

Returns match percentage (0-100) and breakdown of factors.

### OpportunityService
Manages opportunity lifecycle:
- Create, read, update, delete opportunities
- Filter by category, skills, time, location
- Update status (open, in-progress, completed)
- Track applications and volunteer interest

### ApplicationService
Handles volunteer applications:
- Create application records when volunteers apply
- Track application status throughout process
- Update when volunteer completes task
- Notify organizations of new applications

### ImpactService
Aggregates and tracks impact metrics:
- Volunteer hours contributed and task completion
- Organization metrics (volunteers mobilized, hours generated)
- Impact by category and cause area
- Badge and achievement tracking

### MessageService
Manages in-app messaging:
- Send and retrieve messages between users
- Organize conversations by participant
- Notification tracking and delivery
- Message history and context

---

## Authentication & Security

### CORS Configuration
Frontend can access API from configured origins:
- `http://localhost:3000` (React development)
- `http://localhost:5173` (Vite development)
- Production domain (when deployed)

### Error Handling
Global exception handler returns consistent error responses:
```json
{
  "error": "Resource not found",
  "status": 404,
  "timestamp": "2026-03-01T12:30:00Z"
}
```

### Input Validation
- DTO validation with `@Valid`
- Custom validators for business logic
- Sanitization of user inputs
- Request size limits

---

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/kindr/
│   │   │   ├── KindrApplication.java
│   │   │   ├── controllers/         # API endpoints
│   │   │   ├── services/            # Business logic
│   │   │   ├── models/              # Entity definitions
│   │   │   ├── repositories/        # Data access
│   │   │   ├── dtos/                # Data transfer objects
│   │   │   ├── config/              # Configuration classes
│   │   │   └── exception/           # Exception handling
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
│       └── java/com/kindr/
│           ├── controllers/
│           ├── services/
│           └── integration/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

## Development Guidelines

### Creating a New Endpoint

1. **Create DTO** (Data Transfer Object)
2. **Create Repository** (Database access)
3. **Create Service** (Business logic)
4. **Create Controller** (API endpoint)

### Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report
```

---

## Deployment

### Build Production JAR
```bash
mvn clean package -DskipTests
```

### Run Production JAR
```bash
java -jar target/kindr-api.jar --spring.profiles.active=prod
```

---

## Database Schema

### Core Tables

**users**
- id (Primary Key)
- name, email, skills, volunteerHours, badges, completedTasks

**organizations**
- id (Primary Key)
- name, mission, biography, values, website, location

**opportunities**
- id (Primary Key)
- title, description, orgId (Foreign Key), requiredSkills, category, durationMinutes, status

**applications**
- id (Primary Key)
- userId (Foreign Key), opportunityId (Foreign Key), status, createdAt

**messages**
- id (Primary Key)
- senderId (Foreign Key), recipientId (Foreign Key), messageText, timestamp

---

## Troubleshooting

**Port 8080 already in use?**
```bash
# Change port in application.properties
server.port=8081
```

**Database connection error?**
- Verify database is running
- Check connection string in application.properties
- Ensure credentials are correct

**Maven build fails?**
```bash
mvn clean install -U
```

---

## Performance Optimization

- Implement pagination for list endpoints
- Add database indexing on frequently queried fields
- Use caching for match calculations
- Implement request rate limiting
- Optimize queries with `@Query` annotations

---

## Monitoring & Logging

### Log Levels
```properties
logging.level.com.kindr=DEBUG
logging.level.org.springframework=INFO
```

### Health Check
```
GET /api/actuator/health
```

---

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [REST Best Practices](https://restfulapi.net/)
- [Maven Documentation](https://maven.apache.org/guides/)

---

**Backend maintained by Team Kindr**
