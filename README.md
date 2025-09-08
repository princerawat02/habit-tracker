# Habit Tracker

A full-stack habit tracking app with daily check-ins, friends feed, leaderboard, and authentication.

## Features

- User authentication (signup/login)
- Create, edit, delete habits
- Daily/weekly check-ins
- Friends feed
- Leaderboard (rank users by streaks)
- Search and follow users

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd habit-tracker
```

### 2. Install dependencies

```
cd backend
pnpm install
cd ../frontend
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Create a `.env` file in the `frontend` folder for API configuration:

```
VITE_API_BASE_URL=https://your-production-api.com/api
```

### 4. Start the backend

```
cd backend
pnpm dev
```

### 5. Start the frontend

```
cd frontend
pnpm dev
```

### 6. Access the app

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 7. Deployed URL

If deployed, access the app at:

```
<your-deployed-url>
```

## Configuration

- Change MongoDB URI and JWT secret in `.env` as needed.

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Axios, React Router, React Toastify

## License

MIT
