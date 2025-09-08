import express from "express";
import auth from "../middleware/auth.js";
import {
  getHabits,
  createHabit,
  editHabit,
  deleteHabit,
  checkInHabit,
} from "../controllers/habitController.js";
const router = express.Router();

router.get("/", auth, getHabits);
router.post("/", auth, createHabit);
router.put("/:id", auth, editHabit);
router.delete("/:id", auth, deleteHabit);
router.post("/:id/checkin", auth, checkInHabit);

export default router;
