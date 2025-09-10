import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import PatientProfile from "../models/PatientProfile.js";

const router = express.Router();

router.put("/profile", protect, authorize("PATIENT"), async (req, res) => {
  // const { gender } = req.body;
  try {
    const profile = await PatientProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating patient profile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
