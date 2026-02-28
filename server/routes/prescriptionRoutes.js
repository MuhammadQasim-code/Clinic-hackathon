import express from "express";
import {
  createPrescription,
  getPrescriptions
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create prescription (Doctor only)
router.post(
  "/",
  protect,
  authorize("doctor"),
  createPrescription
);

// View prescriptions (Doctor, Admin)
router.get(
  "/",
  protect,
  authorize("doctor", "admin"),
  getPrescriptions
);

export default router;