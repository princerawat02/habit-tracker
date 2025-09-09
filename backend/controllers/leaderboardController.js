import User from "../models/User.js";
import Habit from "../models/Habit.js";

export const getLeaderboard = async (req, res) => {
  const users = await User.find().select("_id username");
  const leaderboard = [];
  for (const user of users) {
    // Get all habits for this user
    const habits = await Habit.find({ owner: user._id });
    // Sum streaks
    const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
    leaderboard.push({ username: user.username, totalStreak });
  }
  // Sorting
  leaderboard.sort((a, b) => b.totalStreak - a.totalStreak);
  res.json(leaderboard);
};
