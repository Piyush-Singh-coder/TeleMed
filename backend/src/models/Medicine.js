import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: 'text'
    },
    brand:{
        type: String,
    },
    composition:{
        type: String, 
    },
    image:{
        type: String,
    },
    usage: {
        type: String
    },
    price:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    isPrescriptionRequired:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;