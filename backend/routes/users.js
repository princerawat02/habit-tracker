import express from "express";
import auth from "../middleware/auth.js";
import { searchUsers, followUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/search", auth, searchUsers);
router.post("/:id/follow", auth, followUser);

export default router;
