import mongoose from "mongoose";

export const ROLES = ['PATIENT', 'DOCTOR', 'ADMIN'];

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    role:
    {
        type: String,
        enum:ROLES,
        default: 'PATIENT',
        index: true,
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;
