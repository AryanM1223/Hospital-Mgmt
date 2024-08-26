const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Staff = require("../models/staffModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");

exports.registerDoctor = async (req, res) => {
  const { username, password, firstName, lastName, specialization, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'Doctor'
    });

    await Doctor.create({
      userId: user.id,
      firstName,
      lastName,
      specialization,
      phone
    });

    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ message: "Error registering doctor", error: err.message });
  }
};

exports.registerStaff = async (req, res) => {
  const { username, password, firstName, lastName, role, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'Staff'
    });

    await Staff.create({
      userId: user.id,
      firstName,
      lastName,
      role, // e.g., Nurse, Admin Staff
      phone
    });

    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ message: "Error registering staff", error: err.message });
  }
};
