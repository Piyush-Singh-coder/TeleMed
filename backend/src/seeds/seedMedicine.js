// backend/src/seeds/seedDoctors.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import DoctorProfile from "../models/DoctorProfile.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const doctorsData = [
  { name: "Dr. Arjun Singh", email: "arjun.singh@example.com", specialization: "Cardiologist", years: 12, fee: 500 },
  { name: "Dr. Meera Sharma", email: "meera.sharma@example.com", specialization: "Dermatologist", years: 8, fee: 400 },
  { name: "Dr. Rakesh Kumar", email: "rakesh.kumar@example.com", specialization: "Orthopedic", years: 15, fee: 600 },
  { name: "Dr. Anjali Gupta", email: "anjali.gupta@example.com", specialization: "Gynecologist", years: 10, fee: 450 },
  { name: "Dr. Vivek Patel", email: "vivek.patel@example.com", specialization: "General Physician", years: 9, fee: 300 },
  { name: "Dr. Kavita Joshi", email: "kavita.joshi@example.com", specialization: "Pediatrician", years: 7, fee: 400 },
  { name: "Dr. Sanjay Verma", email: "sanjay.verma@example.com", specialization: "Neurologist", years: 13, fee: 700 },
  { name: "Dr. Neha Reddy", email: "neha.reddy@example.com", specialization: "ENT Specialist", years: 6, fee: 350 },
  { name: "Dr. Rajesh Iyer", email: "rajesh.iyer@example.com", specialization: "Oncologist", years: 14, fee: 800 },
  { name: "Dr. Priya Nair", email: "priya.nair@example.com", specialization: "Endocrinologist", years: 11, fee: 550 },
  { name: "Dr. Ashok Yadav", email: "ashok.yadav@example.com", specialization: "Urologist", years: 9, fee: 500 },
  { name: "Dr. Sneha Bansal", email: "sneha.bansal@example.com", specialization: "Psychiatrist", years: 8, fee: 450 },
  { name: "Dr. Manish Chawla", email: "manish.chawla@example.com", specialization: "Pulmonologist", years: 10, fee: 600 },
  { name: "Dr. Shalini Deshmukh", email: "shalini.deshmukh@example.com", specialization: "Dermatologist", years: 7, fee: 400 },
  { name: "Dr. Harsh Vardhan", email: "harsh.vardhan@example.com", specialization: "General Surgeon", years: 16, fee: 750 },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB...");

    await User.deleteMany({ role: "DOCTOR" });
    await DoctorProfile.deleteMany({});

    const passwordHash = await bcrypt.hash("password123", 10);

    for (const doc of doctorsData) {
      const user = await User.create({
        name: doc.name,
        email: doc.email,
        password: passwordHash,
        role: "DOCTOR",
      });

      await DoctorProfile.create({
        user: user._id,
        specialization: doc.specialization,
        yearsOfExperience: doc.years,
        consultationFee: doc.fee,
        isAvailable: true,
        isApproved: false, // admin will later approve
        slots: [
          { day: "Monday", from: "10:00", to: "13:00" },
          { day: "Wednesday", from: "14:00", to: "17:00" },
          { day: "Friday", from: "10:00", to: "13:00" },
        ],
      });
    }

    console.log("✅ 15 Doctors seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
