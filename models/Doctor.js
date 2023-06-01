const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    doctor_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    qualification: { type: String },
    date_of_birth: { type: Date },
    date_added: { type: Date, default: Date.now, required: true },
    specialty: { type: String, required: true },
    is_admin: { type: Boolean, required: true },
    service_type: { type: String, required: true },
    hospital_id: { type: String, required: true },
    patient_list: { type: Map, of: String, required: true },
    rating: { type: String, required: true },
})

module.exports = mongoose.model('doctor', doctorSchema)