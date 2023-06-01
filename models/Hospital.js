const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hospitalSchema = new Schema({
    hospital_name: { type: String, required: true, unique: true },
    patient_list: { type: Map, of: String },
    doctor_list: { type: Map, of: String },
    staff_list: { type: Map, of: String },
    admin_list: { type: Map, of: String },
    location: { type: String, required: true },
    description: { type: String },
    rating: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('Hospital', hospitalSchema)