const Patient = require("../models/patientModel");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");

exports.registerPatient = async (req, res) => {
  const { username, password, role, firstName, lastName, dob, gender, address, zipCode } = req.body;

  if (role !== 'Patient') {
    return res.status(400).json({ message: "Role must be 'Patient' for self-registration." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role
    });

    await Patient.create({
      userId: user.id,
      firstName,
      lastName,
      dob,
      gender,
      address,
      zipCode
    });

    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ message: "Error registering patient", error: err.message });
  }
};
