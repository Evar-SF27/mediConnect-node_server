const Hospital = require('../models/Hospital')

const fetchHospitals = async (req, res) => {
    const hospitals = await Hospital.find()
    res.json(hospitals)
}

const fetchHospitalById = async (req, res) => {
    if (!req.params?.id) return res.status(400).json({ 'message': 'Hospital ID required' })
    const hospital = await Hospital.findOne({ _id: req.params.id }).exec()

    if(!hospital) {
        return res.status(204).json({ 'message': `Hospital ID not found` })
    }

    res.status(200).json(hospital)
}

const fetchHospitalByName = async (req, res) => {
    const { hospital_name } = req.params?.hospital_name
    if (!hospital_name) return res.status(400).json({ 'message': 'Hospital ID required' })
    const hospital = await Hospital.findOne({ hospital_name }).exec()

    if(!hospital) {
        return res.status(204).json({ 'message': `Hospital ID not found` })
    }

    res.status(200).json(hospital)
}

const createHospital = async (req, res) => {
    const { hospital_name, location, description } = req.body
    if (!hospital_name || !location || !description) return res.status(400).json({ "message": "Provide all the information needed" })

    try {
        const result = await Hospital.create({
            "hospital_name": hospital_name,
            "location": location,
            "description": description
        })
        res.status(201).json({ "message": result })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const updateHospital = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    
    const hospital = await Hospital.findOne({ _id: id }).exec()
    if (!hospital) return res.status(404).json({ "message": "Hospital doesn't exist" })

    if (req.body?.hospital_name) hospital.hospital_name = req.body?.hospital_name
    if (req.body?.location) hospital.location = req.body?.location
    if (req.body?.description) hospital.description = req.body?.description

    const result = await hospital.save()
    res.status(200).json({ "message" : result })
}

const deleteHospital = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised" })

    const hospital = await Hospital.findOne({ _id: id }).exec()
    if (!hospital) return res.status(404).json({ "message": "Hospital doesn't exist" })

    await hospital.deleteOne()
    res.status(200).json({ "message": "Hospital was successfully deleted" })
}

module.exports = { fetchHospitals, fetchHospitalById, fetchHospitalByName, createHospital, updateHospital, deleteHospital }