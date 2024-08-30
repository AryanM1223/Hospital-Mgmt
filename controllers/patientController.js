const User = require('../models/userModel');
const Patient = require('../models/patientModel');
const bcrypt = require('bcrypt');


exports.registerPatient = async(req,res)=>{
const {username,email,password,firstName,lastName,dob,gender,address,zipCode,symptoms} = req.body;
try {
  const existingPatient = await User.findOne({ where: { username } });
    if(existingPatient){
      return res.status(400).json({msg:"User is already registered"})
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create(
      {
        username,
        email,
        password:hashedpassword,
        role:'Patient'
      }
    );

    patient = await Patient.create({
      userId: user.id,
      username:user.username,
      firstName,
      lastName,
      dob,
      gender,
      address,
      zipCode,
      symptoms
    });
    return res.status(201).json({ user, patient });;
} catch (error) {
  res.status(500).json({ msg: 'Error registering patient', error: error.errors ? error.errors.map(e => e.message) : error.message });
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
    patient.symptoms = symptoms || patient.symptoms;

    await patient.save();
    res.status(200).json({ message: "Patient details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient details", error: error.message });
  }
};
