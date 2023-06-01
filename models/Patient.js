const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    patient_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    date_of_birth: { type: Date },
    date_added: { type: Date, default: Date.now, required: true },
    location: { type: String },
    is_superuser: { type: Boolean, required: true, default: false },
    doctor_list: [{ type: String }],
    hospital_list: [{ type: String }],
    health_status: { type: String, required: true, default: "Healthy" },
    updated_at: { type: Date }
})

module.exports = mongoose.model('patient', patientSchema)