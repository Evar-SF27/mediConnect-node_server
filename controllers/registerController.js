const { Types } = require('mongoose')
const Doctor = require('../models/Doctor')
const Hospital = require('../models/Hospital')
const bcrypt = require('bcrypt')

const registerDoctor = async (req, res) => {
    const { first_name, last_name, email, password, qualification, specialty, hospital_id } = req.body
    if (!first_name || !last_name || !specialty || !email || !password || !qualification || !hospital_id) return res.status(400).json({ "message": "Some required information is missing" })
    
    const duplicateDoctor = await Doctor.findOne({ email }).exec()
    if (duplicateDoctor) return res.status(409).json({ "message": "Doctor already exists" })

    try {
        const hospital = await Hospital.findOne({ _id: new Types.ObjectId(hospital_id) }).exec()
        if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await Doctor.create({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": hashedPassword,
            "qualification": qualification,
            "specialty": specialty,
            "hospital_id": hospital_id
        })

        hospital.doctor_list = [...hospital.doctor_list, result._id]
        await hospital.save()
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const registerStaff = async (req, res) => {
    const { first_name, last_name, title, email, password, qualification, is_admin, role, hospital_id } = req.body
    if (!first_name || !last_name || !title || !email || !password || !qualification || !role || !hospital_id) return res.status(400).json({ "message": "Some required information is missing" })
    
    const duplicateStaff = await Staff.findOne({ email }).exec()
    if (duplicateStaff) return res.status(409).json({ "message": "Staff already exists" })

    try {
        const hospital = await Hospital.findOne({ _id: new Types.ObjectId(hospital_id) }).exec()
        if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await Staff.create({
            "first_name": first_name,
            "last_name": last_name,
            "title": title,
            "email": email,
            "password": hashedPassword,
            "qualification": qualification,
            "is_admin": is_admin,
            "role": role,
            "hospital_id": hospital_id
        })

        hospital.staff_list = [...hospital.staff_list, result._id]
        await hospital.save()
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const registerPatient = async (req, res) => {}

module.exports = { registerStaff, registerDoctor, registerPatient }