const express = require('express')
const router = express.Router()
const doctorController =  require('../../controllers/doctorController')

router.route("/")
    .get(doctorController.getDoctor)
    .put(doctorController.updateDoctor)
    .delete(doctorController.deleteDoctor)

router.route("/:id").get(doctorController.getDoctorById)

module.exports = router