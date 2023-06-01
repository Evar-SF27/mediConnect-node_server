const express = require('express')
const router = express.Router()
const patientController =  require('../../controllers/patientController')

router.route("/")
    .get(patientController.getPatient)
    .put(patientController.updatePatient)
    .delete(patientController.deletePatient)

router.route("/:id").get(patientController.getPatientById)

module.exports = router