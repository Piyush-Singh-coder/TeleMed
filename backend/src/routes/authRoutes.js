import express from "express";
import { login, register, logout, checkAuth, getProfile,} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
// router.post('/addAdmin', createAdmin);

router.get('/check', protect,checkAuth );
router.get('/profile', protect, getProfile);

export default router;