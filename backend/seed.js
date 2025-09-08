import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import Habit from "./models/Habit.js";
import CheckIn from "./models/CheckIn.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

// Clear existing data
await User.deleteMany();
await Habit.deleteMany();
await CheckIn.deleteMany();

// Create sample users (ensure password is hashed)
const users = await User.create([
  { username: "alice", email: "alice@example.com", password: "password123" },
  { username: "bob", email: "bob@example.com", password: "password123" },
  {
    username: "charlie",
    email: "charlie@example.com",
    password: "password123",
  },
]);

// Create sample habits for Alice and Bob
const habits = await Habit.insertMany([
  {
    name: "Drink Water",
    category: "Health",
    frequency: "daily",
    owner: users[0]._id,
  },
  {
    name: "Read Book",
    category: "Personal Development",
    frequency: "daily",
    owner: users[0]._id,
  },
  {
    name: "Exercise",
    category: "Fitness",
    frequency: "weekly",
    owner: users[1]._id,
  },
]);

// Create sample check-ins
await CheckIn.insertMany([
  { habit: habits[0]._id, user: users[0]._id, date: new Date() },
  { habit: habits[1]._id, user: users[0]._id, date: new Date() },
  { habit: habits[2]._id, user: users[1]._id, date: new Date() },
]);

console.log("Database seeded!");
mongoose.connection.close();
