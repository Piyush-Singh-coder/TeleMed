import { generateToken } from "../config/utils.js";
import DoctorProfile from "../models/DoctorProfile.js";
import PatientProfile from "../models/PatientProfile.js";
import User, { ROLES } from "../models/User.js";
import bcrypt, { genSalt } from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    // Prevent direct creation of ADMIN role here
    if (role === "ADMIN") {
      return res.status(403).json({
        message:
          "Admins can only be created by another Admin, not via public registration",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role && ROLES.includes(role) ? role : "PATIENT", // fallback role
    });

    await newUser.save();

    // Create profile based on role
    if (newUser.role === "PATIENT") {
      await PatientProfile.create({ user: newUser._id });
    }
    if (newUser.role === "DOCTOR") {
      await DoctorProfile.create({
        user: newUser._id,
        specialization: "General",
      });
    }

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Error in register controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    // Attach profile based on role
    let profile = null;
    if (user.role === "PATIENT") {
      profile = await PatientProfile.findOne({ user: user._id });
    } else if (user.role === "DOCTOR") {
      profile = await DoctorProfile.findOne({ user: user._id });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile, // either patientProfile or doctorProfile object
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = async(req, res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logout Successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth Controller", error.message);
        res.status(500).json({message: "Internal Server Error"}); 
    }
};

export const getProfile = async (req, res) => {
  try {
    if (req.user.role === "PATIENT") {
      const patient = await PatientProfile.findOne({ user: req.user._id })
        .populate("user", "name email role");
      return res.status(200).json(patient);
    }

    if (req.user.role === "DOCTOR") {
      const doctor = await DoctorProfile.findOne({ user: req.user._id })
        .populate("user", "name email role");
      return res.status(200).json(doctor);
    }

    if (req.user.role === "ADMIN") {
      return res.status(200).json({ message: "Admins don’t have profiles" });
    }

    res.status(404).json({ message: "Profile not found" });
  } catch (error) {
    console.log("Error in getProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const createAdmin = async (req, res) => {
//     try {
//         const existingAdmin = await User.findOne({ role: "ADMIN" });
//         if (existingAdmin) {
//           console.log("❌ Admin already exists:", existingAdmin.email);
//           process.exit(0);
//         }
        
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash("Admin@123", salt);

//         const adminUser = await User.create({
//           name: "Super Admin",
//           email: "admin@example.com",
//           password: hashedPassword,
//           role: "ADMIN",
//         });

//         console.log("✅ Admin created successfully:", adminUser.email);
//         process.exit(0);
//     } catch (error) {
//         console.error("Error seeding admin:", error.message);
//         process.exit(1);
//     }
// }
