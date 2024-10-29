const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');


exports.registerUser = async(req,res) => {
  const {firstName, lastName, phoneNumber, email, password } = req.body;


 try {

  const existingUser = await User.findOne({
    where: {
      [Sequelize.Op.or]: [
        { email },
        { phoneNumber }
      ]
    }
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email or phone number already exists' });
  }
  const hashedpassword = await bcrypt.hash(password,10);

  const newUser = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    password: hashedPassword
  });

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
  
 } catch (error) {
   return res.status(500).json({ message: 'Error registering user', error });
 }
};

exports.loginUser = async(req,res) =>{
const {email,phoneNumber,password} = req.body;
 try {
  
  const user = await User.findOne({
    where: {
      [Sequelize.Op.or]: [
        { email: login },
        { phoneNumber: login }
      ]
    }
  });

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({message:"Invalid Password"});
  }

  return res.status(200).json({message:
    "Login Succesful",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified
    }
  });

 } catch (error) {
  return res.status(500).json({message:"An error has occured",error});
 }

}


