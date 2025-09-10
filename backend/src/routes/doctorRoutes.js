import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { getAllDoctors, getDoctorDashboard, toggleAvailability, updateDoctorProfile } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/",getAllDoctors);
router.get('/me',protect,authorize("DOCTOR"), getDoctorDashboard);
router.put("/profile",protect,authorize("DOCTOR"),updateDoctorProfile);
router.patch("/me/availability", protect, authorize("DOCTOR"), toggleAvailability);

export default router;