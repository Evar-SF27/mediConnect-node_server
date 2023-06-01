const express = require("express")
const router = express.Router()
const staffController =  require("../../controllers/staffController")

router.route("/")
    .get(staffController.getStaff)
    .post(staffController.registerStaff)
    .put(staffController.updateStaff)
    .delete(staffController.deleteStaff)

router.route("/:id").get(staffController.getStaffById)

module.exports = router