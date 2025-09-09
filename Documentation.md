# 📝 Habit Tracker: Approach, UI Design & Challenges

## ✅ Approach

I built a full-stack Habit Tracker web app to help users track and manage their habits.

- **Frontend:**  
  Built with **React** and **Vite** for fast, responsive UI.

- **Backend:**  
  Built using **Node.js**, **Express**, and **MongoDB** (with Mongoose) to handle user authentication, habits, check-ins, feed, and leaderboard.

- **Key Tools:**  
  JWT for authentication, Axios for API calls, and environment variables for secrets.

---

## 🎨 UI Design

I used **DaisyUI** (Tailwind CSS) to quickly design a clean and simple interface because of limited time.

- Cards for habits and activity feed.
- Simple forms for login, registration, and habit management.
- Clear action buttons for Check-In, Edit, and Delete.
- Responsive design by default.

---

## 🚧 Challenges & Solutions

1. **Authentication & Security**  
   Used JWT and middleware to protect routes.

2. **Habit Streak Logic**  
   Tracked consecutive day check-ins using a `CheckIn` model. Took help from AI to design the schema and logic.

3. **Frontend-Backend Integration**  
   Used consistent API responses and Axios interceptors for smooth communication.

4. **CORS Errors**  
   Configured backend to allow requests from local and deployed frontend URLs.

5. **Leaderboard Performance**  
   Used MongoDB aggregation for fast top-user calculation.

6. **Environment Variables**  
   Used `.env.example` file and documented how to set `.env`.

7. **Deployment**  
   Handled base URLs and CORS issues to make frontend and backend work on Render.

---

## 🎯 Final Result

Users can:

- Sign up and log in securely.
- Create, edit, delete, and check in habits.
- Follow friends and view their progress.
- See a leaderboard of top streaks.

All in a simple and functional design.
