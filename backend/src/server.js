import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import jitsiRoutes from  './routes/jitsiRoutes.js'
import aiConsultRoutes from './routes/aiConsultRoutes.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();

if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
}

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/medicine',medicineRoutes);
app.use('/api/meetings', jitsiRoutes);
app.use('/api/ai-consult',aiConsultRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*all", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`Server is running at the port: ${PORT}`);
    connectDB();
})