const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

router.route('/staff').post(authController.loginStaff)
router.route('/doctor').post(authController.loginDoctor)
router.route('/patient').post(authController.loginPatient)

module.exports = router