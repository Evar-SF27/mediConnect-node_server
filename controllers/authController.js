const Staff = require('../models/Staff')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')

const loginStaff = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ "message": "Email and Passwords are missing" })

    const staff = await Staff.findOne({ email }).exec()
    if (!staff) return res.status(404).json({ "message": "Staff not found" })

    const matchPassword = await bcrypt.compare(password, staff.password)
    if (!matchPassword) return res.status(401).json({ "message": "Invalid Credentials" })

    const accessToken = jwt.sign(
        {
            "staff_info": {
                "staff_id": staff._id,
                "email": staff.email,
                "role": staff.role,
                "is_admin": staff.is_admin
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    const refreshToken = jwt.sign(
        { "staff_id": staff._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    res.status(201).json({
        "message": {
            "access_token": accessToken,
            "refresh_token": refreshToken
        }
    })
}

const loginDoctor = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ "message": "Email and Passwords are missing" })

    const doctor = await Doctor.findOne({ email }).exec()
    if (!doctor) return res.status(404).json({ "message": "Staff not found" })

    const matchPassword = await bcrypt.compare(password, doctor.password)
    if (!matchPassword) return res.status(401).json({ "message": "Invalid Credentials" })

    const accessToken = jwt.sign(
        {
            "doctor_info": {
                "doctor_id": doctor._id,
                "email": doctor.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    const refreshToken = jwt.sign(
        { "doctor_id": doctor._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    res.status(201).json({
        "message": {
            "access_token": accessToken,
            "refresh_token": refreshToken
        }
    })
}

const loginPatient = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ "message": "Email and Passwords are missing" })

    const patient = await Patient.findOne({ email }).exec()
    if (!patient) return res.status(404).json({ "message": "Staff not found" })

    const matchPassword = await bcrypt.compare(password, patient.password)
    if (!matchPassword) return res.status(401).json({ "message": "Invalid Credentials" })

    const accessToken = jwt.sign(
        {
            "patient_info": {
                "patient_id": patient._id,
                "email": patient.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    const refreshToken = jwt.sign(
        { "patient_id": patient._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )

    res.status(201).json({
        "message": {
            "access_token": accessToken,
            "refresh_token": refreshToken
        }
    })
}

module.exports = { loginStaff, loginDoctor, loginPatient }