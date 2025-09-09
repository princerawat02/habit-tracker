# Habit Tracker

## Project Overview

Habit Tracker is a full-stack web application designed to help users build and maintain positive habits. It features user authentication, habit creation, daily check-ins, a social feed, and a leaderboard to encourage friendly competition.

## Features

- User Signup & Login
- Create, Edit, and Delete Habits
- Daily Habit Check-ins
- Social Feed to view friends' activities
- Leaderboard to track top performers
- Search for other users

## Technologies Used

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** (see backend/config/db.js for details)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/princerawat02/habit-tracker.git
cd habit-tracker
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
pnpm install
```

#### Frontend

```bash
cd ../frontend
pnpm install
```

### 3. Environment Variables

- Copy `.env.example` in the `backend` folder and rename it to `.env`.
- Update the values as needed (e.g., database connection string, JWT secret).

### 4. Seed the Database (Optional)

If you want sample data:

```bash
cd backend
node seed.js
```

### 5. Start the Backend Server

```bash
cd backend
pnpm start
```

### 6. Start the Frontend

```bash
cd frontend
pnpm run dev
```

---

## Accessing the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000) (default)

---

## User Flow

1. **Signup/Login:** Create an account or log in.
2. **Create Habit:** Add new habits you want to track.
3. **Check-in:** Mark habits as completed each day.
4. **Feed:** View your and others' habit activity.
5. **Leaderboard:** See top users based on habit streaks.
6. **Search Users:** Find and connect with other users.

---

## Notes

- Make sure to update `.env.example` to `.env` and fill in all required environment variables for the backend to work.
- If you encounter issues, check your database connection and environment variables.

---

## Contact

For any issues, contact [princerawat02](https://github.com/princerawat02).
