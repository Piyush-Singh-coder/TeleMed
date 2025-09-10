import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import bcrypt, { genSalt } from "bcryptjs";
import DoctorProfile from "../models/DoctorProfile.js";

const router = express.Router();

router.post("/add-doctor", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Doctor added successfully" });
});

router.post("/create-doctor", protect, authorize("ADMIN"), async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      _id: newAdmin._id,
      email: newAdmin.email,
      role: newAdmin.role,
    });
  } catch (error) {
    console.error("Error creating admin:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/doctors',protect, authorize("ADMIN"),async (req, res) =>{
  try {
    const doctors = await DoctorProfile.find().populate("user", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }

})

router.put('/doctors/:doctorId/approval', protect, authorize("ADMIN"), async (req, res)=> {
   try {
    const { doctorId } = req.params;
    const { isApproved } = req.body;

    const doctor = await DoctorProfile.findByIdAndUpdate(
      doctorId,
      { isApproved },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor approval status updated", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor status", error });
  }
})

export default router;
