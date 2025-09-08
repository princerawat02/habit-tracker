import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const CheckIn = mongoose.model("CheckIn", CheckInSchema);
export default CheckIn;
