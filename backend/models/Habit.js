import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  streak: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model("Habit", HabitSchema);
export default Habit;
