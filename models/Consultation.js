const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consultationSchema = new Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    hospital_id: { type: String, required: true },
    vitals: { type: Map, of: String, required: true },
    complaints: { type: String, required: true },
    prelimary_diagnosis: { type: String },
    tests: [{ type: Map, of: String }],
    diagnosis: { type: String },
    prescription_id: { type: String },
    date_added: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date },   
})

module.exports = mongoose.model('consultation', consultationSchema)