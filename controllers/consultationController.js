const { Types } = require('mongoose')
const Consultation = require('../models/Consultation')
const Hospital = require('../models/Hospital')
const Doctor = require('../models/Doctor') 

const fetchConsultations = async (req, res) => {
    const consultations = await Consultation.find()
    res.status(200).json({ "message": consultations })
}

const fetchConsultationById = async (req, res) => {
    if (!req.params?.id) return res.status(400).json({ 'message': 'Hospital ID required' })
    const consultation = await Consultation.findOne({ _id: req.params.id }).exec()

    if(!consultation) {
        return res.status(204).json({ 'message': `Consultation ID not found` })
    }

    res.status(200).json({ "message": consultation })
}

const fetchConsultationByPatientId = async (req, res) => {
    const { patient_id } = req.params?.patient_id
    if (!patient_id) return res.status(400).json({ 'message': 'Hospital ID required' })
    const consultation = await Consultation.findOne({ patient_id }).exec()

    if(!consultation) {
        return res.status(204).json({ 'message': `Consultation ID not found` })
    }

    res.status(200).json({ "message": consultation })
}

const createConsultation = async (req, res) => {
    const { patient_id, doctor_id, hospital_id, temperature, height, weight, blood_pressure, complaints } = req.body
    if (!patient_id || !doctor_id || !hospital_id || !complaints) return res.status(400).json({ "message": "Provide all the information needed" })

    try {
        const hospital = await Hospital.findOne({ _id: new Types.ObjectId(hospital_id) }).exec()
        if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })
        const doctor = await Doctor.findOne({ _id: new Types.ObjectId(doctor_id) }).exec()
        if(!doctor) return res.status(400).json({ "message": "Hospital doesn't exist" })

        const result = await Consultation.create({
            "patient_id": patient_id,
            "doctor_id": doctor_id,
            "vitals": {
                "temperature": temperature,
                "height": height,
                "weight": weight,
                "blood_pressure": blood_pressure
            },
            "complaints": complaints,
            "hospital_id": hospital_id,
        })
        res.status(201).json({ "message": result })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const updateConsultation = async (req, res) => {
    const { id, patient_id, doctor_id, hospital_id, temperature, height, weight, blood_pressure, complaints } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    if (!patient_id || !doctor_id || !hospital_id || !temperature || !height || !weight || !blood_pressure || !complaints) return res.status(400).json({ "message": "Provide all the information needed" })
    
    const consultation = await Consultation.findOne({ _id: id }).exec()
    if (!consultation) return res.status(404).json({ "message": "Consultation doesn't exist" })

    try {
        const hospital = await Hospital.findOne({ _id: new Types.ObjectId(hospital_id) }).exec()
        if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })
        const doctor = await Doctor.findOne({ _id: new Types.ObjectId(doctor_id) }).exec()
        if(!doctor) return res.status(400).json({ "message": "Hospital doesn't exist" })

        const result = await Consultation.findOneAndUpdate(
            { _id: new Types.ObjectId(id)},
            {$set: {
                "patient_id": patient_id,
                "doctor_id": doctor_id,
                "vitals": {
                    "temperature": temperature,
                    "height": height,
                    "weight": weight,
                    "blood_pressure": blood_pressure
                },
                "complaints": complaints,
                "hospital_id": hospital_id,
                "updated_at": Date.now()
            }},
            { new: true }
        )

        res.status(200).json({ "message" : result })
        
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const provideDiagnosis = async (req, res) => {
    const { id, preliminary_diagnosis, diagnosis, tests, prescription_id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    
    const consultation = await Consultation.findOne({ _id: id }).exec()
    if (!consultation) return res.status(404).json({ "message": "Consultation doesn't exist" })

    try {
        const update = {
            "preliminary_diagnosis": preliminary_diagnosis,
            "diagnosis": diagnosis,
            "prescription_id": prescription_id,
            "tests": tests,
            "updated_at": Date.now()
        }
    
        const result = await Consultation.findOneAndUpdate(
            { _id: new Types.ObjectId(id) },
            { $set: update },
            { new: true }
        )
    
        res.status(200).json({ "message" : result })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const provideTestResults = async (req, res) => {
    const { id, tests } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    if (!tests) return res.status(401).json({ "message": "Test results are not available" })
    
    const consultation = await Consultation.findOne({ _id: id }).exec()
    if (!consultation) return res.status(404).json({ "message": "Consultation doesn't exist" })
    
    try {
        consultation.tests.forEach((test, index) => {
            if (index < tests.length) {
                // test.result = tests[index]
                console.log(test.name)
                console.log("Printed")
            }
            });

        consultation.markModified('tests')
        const result = await consultation.save()

        res.status(200).json({ "message": result })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const deleteConsultation = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised" })

    const consultation = await Consultation.findOne({ _id: id }).exec()
    if (!consultation) return res.status(404).json({ "message": "Consultation doesn't exist" })

    await consultation.deleteOne()
    res.status(200).json({ "message": "Consultation was successfully deleted" })
}

module.exports = { fetchConsultations, fetchConsultationById, fetchConsultationByPatientId, createConsultation, updateConsultation, provideDiagnosis, provideTestResults, deleteConsultation }