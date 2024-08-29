const express = require("express");
const router = express.Router();
const { registerPatient, getPatientDetails } = require("../controllers/patientController");
const {isAuthenticated} = require("../middleware/auth");


router.post("/register-patient", registerPatient);
router.get("/get-patient-detail",isAuthenticated,getPatientDetails);


module.exports = router;
