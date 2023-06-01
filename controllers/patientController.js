const Patient = require('../models/Patient')

const getPatient = async (req, res) => {
    const patient = await Patient.find()
    res.status(200).json({ "message": doctor })
}

const getPatientById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ "message": "Doctor ID is required" })

    const patient = await Patient.findOne({ _id: id }).exec()
    res.status(200).json({ "message": patient })
}

const updatePatient = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    
    const patient = await Patient.findOne({ _id: id }).exec()
    if (!patient) return res.status(404).json({ "message": "Patient doesn't exist" })

    if (req.body?.first_name) patient.first_name = req.body?.first_name
    if (req.body?.last_name) patient.last_name = req.body?.last_name
    if (req.body?.email) patient.email = req.body?.email
    if (req.body?.patient_name) patient.patient_name = req.body?.patient_name
    if (req.body?.age) patient.age = req.body?.age
    if (req.body?.gender) patient.gender = req.body?.gender
    if (req.body?.health_status) patient.health_status = req.body?.health_status
    if (req.body?.location) patient.location = req.body?.location
    if (req.body?.date_of_birth) patient.date_of_birth = req.body?.date_of_birth
    patient.updated_at = Date.now()

    const result = await patient.save()
    res.status(200).json({ "message" : result })
}

const deletePatient = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised" })

    const patient = await Patient.findOne({ _id: id }).exec()
    if (!patient) return res.status(404).json({ "message": "Patient doesn't exist" })

    await patient.deleteOne()
    res.status(200).json({ "message": "Patient was successfully deleted" })
}

module.exports = { getPatient, getPatientById, updatePatient, deletePatient  }