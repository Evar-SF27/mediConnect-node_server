const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    title: { type: String, required: true },
    staff_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    qualification: { type: String, required: true },
    date_of_birth: { type: Date },
    is_admin: { type: Boolean, required: true },
    role: { type: String, required: true },
    hospital_id: { type: String, required: true },
    date_added: { type: Date, required: true, default: Date.now() },
    update_added: { type: Date, required: true, default: Date.now() },
})

module.exports = mongoose.model('staff', staffSchema)