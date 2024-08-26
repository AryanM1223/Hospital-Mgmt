const express = require("express");
const { registerPatient } = require("../controllers/patientController");
const { login } = require("../controllers/authController");

const router = express.Router();


router.post("/register/patient", registerPatient);
router.post("/login", login);


router.post("/register/doctor", isAuthenticated, authorizeRoles(['Admin']), registerDoctor);
router.post("/register/staff", isAuthenticated, authorizeRoles(['Admin']), registerStaff);

module.exports = router;
