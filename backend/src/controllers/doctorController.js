import DoctorProfile from "../models/DoctorProfile.js"

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorProfile.find().populate("user", "name email");
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getDoctorDashboard = async(req, res) => {
    try {
        const doctor = await DoctorProfile.findOne({user: req.user._id}).populate("user","name email");
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error fetching doctorDashboard:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateDoctorProfile = async(req, res) => {
    try {
        const doctor = await DoctorProfile.findOneAndUpdate(
            {user: req.user._id},
            req.body,
            {new: true, runValidators: true}
        );
        if (!doctor){
            return res.status(404).json({message: "Doctor Profile not found"});
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error in updateDoctor:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const toggleAvailability = async(req, res) => {
    try {
        const doctor = await DoctorProfile.findOne({user: req.user._id});
        if (!doctor){
            return res.status(200).json({message: "Doctor Profile not found"});
        }
        doctor.isAvailable = !doctor.isAvailable;
        await doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error in toggleAvailability:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}