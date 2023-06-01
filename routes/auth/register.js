const express = require('express')
const router = express.Router()
const registerController = require('../../controllers/registerController')

router.route('/staff').post(registerController.registerStaff)
router.route('/doctor').post(registerController.registerDoctor)
router.route('/patient').post(registerController.registerPatient)

module.exports = router