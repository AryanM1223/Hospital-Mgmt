const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require('../models/userModel');

const Doctor = sequelize.define(
  "doctors",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isIn: [['Male', 'Female', 'Other']],
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Doctor.belongsTo(User, { foreignKey: 'userId' });

module.exports = Doctor;
