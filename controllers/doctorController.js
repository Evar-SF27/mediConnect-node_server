const { Types } = require('mongoose')
const Doctor = require('../models/Doctor')
const Hospital = require('../models/Hospital')
const bcrypt = require('bcrypt')

const getDoctor = async (req, res) => {
    const doctor = await Doctor.find()
    res.status(200).json({ "message": doctor })
}

const getDoctorById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ "message": "Doctor ID is required" })

    const doctor = await Doctor.findOne({ _id: id }).exec()
    res.status(200).json({ "message": doctor })
}

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

const updateDoctor = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    
    const doctor = await Doctor.findOne({ _id: id }).exec()
    if (!doctor) return res.status(404).json({ "message": "Doctor doesn't exist" })

    if (req.body?.first_name) doctor.first_name = req.body?.first_name
    if (req.body?.last_name) doctor.last_name = req.body?.last_name
    if (req.body?.email) doctor.email = req.body?.email
    if (req.body?.doctor_name) doctor.doctor_name = req.body?.doctor_name
    if (req.body?.qualification) doctor.qualification = req.body?.qualification
    if (req.body?.gender) doctor.gender = req.body?.gender
    if (req.body?.specialty) doctor.specialty = req.body?.specialty
    if (req.body?.rating) doctor.rating = req.body?.rating
    if (req.body?.date_of_birth) doctor.date_of_birth = req.body?.date_of_birth
    doctor.updated_at = Date.now()

    const result = await doctor.save()
    res.status(200).json({ "message" : result })
}

const deleteDoctor = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised" })

    const doctor = await Doctor.findOne({ _id: id }).exec()
    if (!doctor) return res.status(404).json({ "message": "Doctor doesn't exist" })

    const hospital = await Hospital.findOne({ _id: doctor.hospital_id }).exec()
    if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })

    doctor_list = hospital.doctor_list.filter((doctor_id) => doctor_id !== id)
    hospital.doctor_list = doctor_list
    await hospital.save()

    await Doctor.deleteOne()
    res.status(200).json({ "message": "Doctor was successfully deleted" })
}

module.exports = { getDoctor, getDoctorById, registerDoctor, updateDoctor, deleteDoctor  }