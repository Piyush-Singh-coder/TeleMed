import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { aiConsult } from "../controllers/aiConsultController.js";


const router = express.Router();

router.post("/", protect, aiConsult);

export default router;
