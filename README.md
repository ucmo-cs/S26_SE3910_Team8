# Commerce Bank Appointment Scheduler — Team 8

A full-stack appointment booking system for Commerce Bank, built with React + Vite (frontend) and Spring Boot (backend).

## Project Structure

```
S26_SE3910_Team8/
├── frontend/   # React + Vite application
└── backend/    # Spring Boot REST API
```

---

## Prerequisites

- **Node.js** v20.19+ (or v22.12+)
- **Java** 17+
- **Maven** 3.8+

---

## Backend

**Tech stack:** Spring Boot 3.3, JPA, H2 in-memory database, Lombok

### Run

```bash
cd backend
mvn spring-boot:run
```

The server starts on **http://localhost:8081**

### H2 Console

Access the in-memory database at **http://localhost:8081/h2-console**

| Field | Value |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:schedulerdb` |
| Username | `sa` |
| Password | *(leave blank)* |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/details` | Get all appointments with customer info |
| GET | `/api/appointments/{id}` | Get appointment by ID |
| POST | `/api/appointments?userId={id}` | Create appointment |
| PUT | `/api/appointments/{id}` | Update appointment |
| DELETE | `/api/appointments/{id}` | Delete appointment |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| GET | `/api/users/by-email?email={email}` | Get user by email |
| POST | `/api/users` | Create user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

---

## Frontend

**Tech stack:** React 19, Vite 7, React Router, Tailwind CSS

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173**

### Pages

| Route | Description |
|-------|-------------|
| `/` | Select a service |
| `/branch` | Select a branch |
| `/datetime` | Select date & time |
| `/info` | Enter personal information |
| `/confirmation` | Booking confirmation |
| `/appointments` | View all appointments |

### Environment Variable

To point the frontend at a different backend URL, create `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8081/api
```

---

## Running Both Together

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.
