import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    bloodGroup:{
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    contact:{
        type: String,
    },
    medicalHistory:{
        pastIllnesses: [String],
        surgeries: [String],
        familyHistory: [String],
        allergies: [String],
        currentMedication: [String]
    },
}, {timestamps: true})

const PatientProfile = mongoose.model('PatientProfile',patientProfileSchema);

export default PatientProfile;