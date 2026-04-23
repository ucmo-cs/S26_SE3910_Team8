# Spring Backend

This backend provides a Spring Boot REST API for:

- Users (`/api/users`)
- Appointments (`/api/appointments`)

Each user can have many appointments, and each appointment belongs to one user.

## Prerequisites

- Java 17+
- Maven 3.9+
- MySQL 8+

## Database Setup

1. Create a MySQL user/password you want to use.
2. Update `src/main/resources/application.properties`:
   - `spring.datasource.username`
   - `spring.datasource.password`
3. Start MySQL. The schema (`scheduler_db`) is auto-created by JDBC URL if missing.

## Run

From the `backend` directory:

```bash
mvn spring-boot:run
```

API runs at `http://localhost:8080`.

## User Reuse by Email

- `POST /api/users` now reuses an existing user if the email already exists.
- When email exists, it updates `firstName`, `lastName`, and `phoneNumber` and returns that user.
- Added lookup endpoint: `GET /api/users/by-email?email=user@example.com`
