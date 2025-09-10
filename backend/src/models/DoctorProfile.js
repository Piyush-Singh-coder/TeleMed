import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
    },
    consultationFee: {
        type: Number,
        default: 0
    },
    isAvailable:{
        type: Boolean,
        default: false,
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    slots:[
        {
            day: {type: String},
            from: String,
            to: String,
        }
    ]
}, {timestamps: true})

const DoctorProfile = mongoose.model('DoctorProfile',doctorProfileSchema)

export default DoctorProfile;