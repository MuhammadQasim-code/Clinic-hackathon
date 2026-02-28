import express from "express";
import { register, login, getAllDoctors } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/doctors", getAllDoctors); // <--- Required for the dropdown

export default router;