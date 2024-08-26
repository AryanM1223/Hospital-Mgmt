const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require('./models/userModel');

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
