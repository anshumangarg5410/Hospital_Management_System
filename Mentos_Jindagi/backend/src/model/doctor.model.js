import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    speciality: { 
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

export const doctor_details = mongoose.model('doctor_details', doctorSchema)