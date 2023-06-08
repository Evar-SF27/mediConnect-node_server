const express = require('express')
const router = express.Router()
const consultationController =  require('../../controllers/consultationController')

router.route("/")
    .get(consultationController.fetchConsultations)
    .post(consultationController.createConsultation)
    .put(consultationController.updateConsultation)
    .delete(consultationController.deleteConsultation)

router.route("/diagnosis").put(consultationController.provideDiagnosis)
router.route("/tests").put(consultationController.provideTestResults)
router.route("/:id").get(consultationController.fetchConsultationById)
router.route("/patient/:id").get(consultationController.fetchConsultationByPatientId)

module.exports = router