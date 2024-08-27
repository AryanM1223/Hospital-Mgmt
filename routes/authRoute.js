const express = require("express");
const { registerPatient } = require("../controllers/patientController");
const { login } = require("../controllers/authController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { registerDoctor, registerStaff } = require("../controllers/adminController");

const router = express.Router();

router.route("/register/patient").post(registerPatient);
router.route("/login").post(login);

router.route("/register/doctor")
  .post(isAuthenticated, authorizeRoles(['Admin']), registerDoctor);

router.route("/register/staff")
  .post(isAuthenticated, authorizeRoles(['Admin']), registerStaff);

module.exports = router;
