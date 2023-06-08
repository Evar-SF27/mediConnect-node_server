const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hospitalSchema = new Schema({
    hospital_name: { type: String, required: true, unique: true },
    patient_list: [{ type: String }],
    doctor_list: [{ type: String }],
    staff_list: [{ type: String }],
    admin_list: [{ type: String }],
    location: { type: String },
    description: { type: String },
    rating: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('Hospital', hospitalSchema)