const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    doctor_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String },
    qualification: { type: String },
    date_of_birth: { type: Date },
    date_added: { type: Date, default: Date.now, required: true },
    updated_at: { type: String },
    specialty: { type: String, required: true },
    hospital_id: { type: String, required: true },
    patient_list: [{ type: String }],
    rating: { type: String },
})

module.exports = mongoose.model('doctor', doctorSchema)