import express from "express";
import { 
  createPatient, 
  getPatients, 
  updatePatient, 
  deletePatient,
  getPatientTimeline 
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create patient (Admin or Receptionist) [cite: 39, 40]
router.post("/", protect, authorize("admin", "receptionist"), createPatient);

// Get all patients (Admin, Doctor, Receptionist) [cite: 34]
router.get("/", protect, authorize("admin", "doctor", "receptionist"), getPatients);

// Get specific patient history timeline [cite: 90, 102]
router.get("/timeline/:id", protect, getPatientTimeline);

// Update patient info [cite: 42, 88]
router.put("/:id", protect, authorize("admin", "receptionist"), updatePatient);

// Delete patient (Admin only)
router.delete("/:id", protect, authorize("admin"), deletePatient);

export default router;