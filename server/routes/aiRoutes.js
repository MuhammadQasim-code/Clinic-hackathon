import express from "express";
import { symptomCheck } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/symptom-check", protect, authorize("doctor"), symptomCheck);

export default router;