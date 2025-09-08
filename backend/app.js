import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import habitsRoutes from "./routes/habits.js";
import usersRoutes from "./routes/users.js";
import feedRoutes from "./routes/feed.js";
import leaderboardRoutes from "./routes/leaderboard.js";

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);
app.use("/api/habits", habitsRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
