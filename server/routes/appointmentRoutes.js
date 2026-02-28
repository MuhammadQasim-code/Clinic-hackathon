import express from "express";
import { 
  createAppointment, 
  getAllAppointments, 
  getDoctorSchedule, 
  updateAppointmentStatus 
} from "../controllers/appointmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. All routes here require being logged in
router.use(protect);

// 2. Specific Route (Must be at the TOP)
// URL: /api/appointments/doctor-schedule
router.get("/doctor-schedule", authorize("doctor"), getDoctorSchedule);

// 3. Status Update Route
// URL: /api/appointments/status/:id
router.patch("/status/:id", authorize("doctor", "receptionist", "admin"), updateAppointmentStatus);

// 4. General Routes
// URL: /api/appointments
router.post("/", authorize("receptionist", "patient", "admin"), createAppointment);
router.get("/", authorize("receptionist", "admin"), getAllAppointments);

export default router;