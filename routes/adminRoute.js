const express = require("express");
const router = express.Router();
const { registerDoctor, getDoctorDetails } = require("../controllers/adminController");
const {isAuthenticated} = require("../middleware/auth");

router.post("/register-doctor", registerDoctor);
router.get("/get-doctor-detail/:userId",getDoctorDetails);

module.exports = router;