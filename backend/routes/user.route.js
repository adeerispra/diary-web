import express from "express";
import { getUserProfile, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.put("/update", protectRoute, updateUser);
router.get("/me", protectRoute, getUserProfile);

export default router;
