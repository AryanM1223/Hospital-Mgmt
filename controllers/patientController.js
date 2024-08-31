const User = require('../models/userModel');
const Patient = require('../models/patientModel');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');


exports.registerPatient = async (req, res) => {
  const {
      phoneNumber,  
      email,
      password,
      firstName,
      lastName,
      dob,
      gender,
      address,
      zipCode
  } = req.body;

  // Validate required fields
  if (!phoneNumber || !email || !password || !firstName || !lastName || !dob || !gender || !address || !zipCode) {
      return res.status(400).json({ msg: "All fields are required" });
  }

  try {
      // Check if the user already exists
      const existingPatient = await User.findOne({
          where: {
              [Sequelize.Op.or]: [
                  { email },
                  { phoneNumber: phoneNumber }  // Adjust to use 'phonenumber'
              ]
          }
      });

      if (existingPatient) {
          return res.status(400).json({ msg: "User is already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
          phoneNumber: phoneNumber,  // Use 'phonenumber' for the field name
          email,
          password: hashedPassword,
          role: 'Patient'
      });

      // Create the patient profile
      const patient = await Patient.create({
          userId: user.id,
          firstName,
          lastName,
          dob,
          gender,
          address,
          zipCode
      });

      return res.status(201).json({ user, patient });

  } catch (error) {
      console.error('Error during patient registration:', error); // Debugging log
      res.status(500).json({
          msg: 'Error registering patient',
          error: error.errors ? error.errors.map(e => e.message) : error.message
      });
  }
};


exports.getPatientDetails = async (req, res) => {
  const userId = req.params['userId'];
  try {
    const patient = await Patient.findOne({ where: { userId } });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient details", error: error.message });
  }
};


exports.updatePatientDetails = async (req, res) => {
  const { name, dob, address, symptoms } = req.body;

  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.name = name || patient.name;
    patient.dob = dob || patient.dob;
    patient.address = address || patient.address;
   

    await patient.save();
    res.status(200).json({ message: "Patient details updated successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Error updating patient details", error: error.message });
  }
};
