import Habit from "../models/Habit.js";
import CheckIn from "../models/CheckIn.js";

export const getHabits = async (req, res) => {
  const habits = await Habit.find({ owner: req.user._id });
  res.json(habits);
};

export const createHabit = async (req, res) => {
  const { name, category, frequency } = req.body;
  if (!name || !frequency) {
    return res.status(400).json({ message: "Name and frequency are required" });
  }
  // Prevent duplicate habit names per user
  const existing = await Habit.findOne({ owner: req.user._id, name });
  if (existing) {
    return res
      .status(400)
      .json({ message: "Habit with this name already exists" });
  }
  const habit = new Habit({ name, category, frequency, owner: req.user._id });
  await habit.save();
  // Add habit to user's habits array
  req.user.habits.push(habit._id);
  await req.user.save();
  res.json(habit);
};

export const editHabit = async (req, res) => {
  const { name, category, frequency } = req.body;
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    { name, category, frequency },
    { new: true }
  );
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  res.json(habit);
};

export const deleteHabit = async (req, res) => {
  const habit = await Habit.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  res.json({ message: "Habit deleted" });
};

export const checkInHabit = async (req, res) => {
  const habit = await Habit.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  // Prevent multiple check-ins per day/week
  const now = new Date();
  let start, end;
  if (habit.frequency === "daily") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  } else {
    // weekly: get start of week (Sunday)
    const day = now.getDay();
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 7);
  }
  const alreadyCheckedIn = await CheckIn.findOne({
    habit: habit._id,
    user: req.user._id,
    date: { $gte: start, $lt: end },
  });
  if (alreadyCheckedIn) {
    return res
      .status(400)
      .json({ message: "Already checked in for this period" });
  }
  // Create check-in
  const checkIn = new CheckIn({ habit: habit._id, user: req.user._id });
  await checkIn.save();
  // Update streak
  habit.streak += 1;
  await habit.save();
  res.json({ message: "Habit checked in", streak: habit.streak });
};
