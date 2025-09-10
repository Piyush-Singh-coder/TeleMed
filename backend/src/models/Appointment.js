import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    scheduledFor:{
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING','CONFIRMED','COMPLETED'],
        default: 'PENDING'
    },
    
},{timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;