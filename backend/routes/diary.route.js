import express from "express";
import {
  createDiary,
  deleteDiary,
  getAllDiaryUser,
  updateDiary,
} from "../controllers/diary.controller.js";
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllDiaryUser);
router.post("/create", protectRoute, createDiary);
router.delete("/:id", protectRoute, deleteDiary);
router.put("/:id", protectRoute, updateDiary);

export default router;
