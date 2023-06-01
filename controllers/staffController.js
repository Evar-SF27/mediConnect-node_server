const Staff = require('../models/Staff')

const getStaff = async (req, res) => {

}

const getStaffById = async (req, res) => {
    
}

const getStaffByRole = async (req, res) => {
    
}

const registerStaff = async (req, res) => {
    const { first_name, last_name, title, email, password, qualification, is_admin, role, hospital_id } = req.body
    if (!first_name || !last_name || !title || !email || !password || !is_admin || !role || !hospital_id || !qualification || !is_admin) {
        return res.status.json({ "message": "Some required information is mising" })
    }

    const duplicateStaff = await Staff.findOne({ email }).exec()
    if (!duplicateStaff) return res.status(409).json({ "message": "Staff already exists" })

    
}

const updateStaff = async (req, res) => {
    
}

const deleteStaff = async (req, res) => {
    
}

module.exports = { getStaff, getStaffById, getStaffByRole, registerStaff, updateStaff, deleteStaff  }

