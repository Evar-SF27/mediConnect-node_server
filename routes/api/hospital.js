const express = require("express")
const router = express.Router()
const hospitalController =  require("../../controllers/hospitalController")

router.route("/")
    .get(hospitalController.fetchHospitals)
    .post(hospitalController.createHospital)
    .put(hospitalController.updateHospital)
    .delete(hospitalController.deleteHospital)

router.route("/:id").get(hospitalController.fetchHospitalById)
router.route("/:name").get(hospitalController.fetchHospitalByName)

module.exports = router