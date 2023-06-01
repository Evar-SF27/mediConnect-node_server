const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    patient_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date },
    date_added: { type: Date, default: Date.now, required: true },
    service_type: { type: String, required: true },
    doctor_list: { type: Map, of: String, required: true },
    hospital_list: { type: Map, of: String, required: true },
    health_status: { type: String, required: true },
})

module.exports = mongoose.model('patient', patientSchema)