const Staff = require('../models/Staff')
const Hospital = require('../models/Hospital')

const getStaff = async (req, res) => {
    const staff = await Staff.find()
    res.status(200).json({ "message": staff })
}

const getStaffById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ "message": "Staff ID is required" })

    const staff = await Staff.findOne({ _id: id }).exec()
    res.status(200).json({ "message": staff })
}

const updateStaff = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised: ID required" })
    
    const staff = await Staff.findOne({ _id: id }).exec()
    if (!staff) return res.status(404).json({ "message": "Staff doesn't exist" })

    if (req.body?.first_name) staff.first_name = req.body?.first_name
    if (req.body?.last_name) staff.last_name = req.body?.last_name
    if (req.body?.title) staff.title = req.body?.title
    if (req.body?.gender) staff.gender = req.body?.gender
    if (req.body?.email) staff.email = req.body?.email
    if (req.body?.staff_name) staff.staff_name = req.body?.staff_name
    if (req.body?.qualification) staff.qualification = req.body?.qualification
    if (req.body?.is_admin) staff.is_admin = req.body?.is_admin
    if (req.body?.role) staff.role = req.body?.role
    if (req.body?.date_of_birth) staff.date_of_birth = req.body?.date_of_birth
    staff.updated_at = Date.now()

    const result = await staff.save()
    res.status(200).json({ "message" : result })
}

const deleteStaff = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(401).json({ "message": "Unauthorised" })

    const staff = await Staff.findOne({ _id: id }).exec()
    if (!staff) return res.status(404).json({ "message": "Staff doesn't exist" })

    const hospital = await Hospital.findOne({ _id: staff.hospital_id }).exec()
    if(!hospital) return res.status(400).json({ "message": "Hospital doesn't exist" })

    staff_list = hospital.staff_list.filter((staff_id) => staff_id !== id)
    hospital.staff_list = staff_list
    await hospital.save()

    await staff.deleteOne()
    res.status(200).json({ "message": "Staff was successfully deleted" })
}

module.exports = { getStaff, getStaffById, updateStaff, deleteStaff  }

