const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

exports.registerDoctor = async(req, res) => {
    const {
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        dob,
        gender,
        address,
        specialization,
        licenseNumber,
        yearsOfExperience
    } = req.body;

    try {
        const existingDoc = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: email },
                    { phoneNumber: phoneNumber }
                ]
            }
        });

        if (existingDoc) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            phoneNumber,
            email,
            password: hashedpassword,
            role: 'Doctor'
        });

        const doctor = await Doctor.create({
            userId: user.id,
            firstName,
            lastName,
            dob,
            gender,
            address,
            specialization,
            licenseNumber,
            yearsOfExperience
        });

        return res.status(201).json({ user, doctor });

    } catch (error) {
        res.status(500).json({ 
            msg: 'Error registering doctor', 
            error: error.errors ? error.errors.map(e => e.message) : error.message 
        });
    }
};

exports.getDoctorDetails = async (req, res) => {
    const userId = req.params['userId'];

    try {
        const doctor = await Doctor.findOne({ where: { userId } });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.status(200).json({ doctor });

    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor details", error: error.message });
    }
};
