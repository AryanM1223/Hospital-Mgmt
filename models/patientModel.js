const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require('../userModel');  

const Patient = sequelize.define(
  "patients",
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
      type: DataTypes.CHAR(1),
      allowNull: true,
      validate: {
        isIn: [['Male', 'Female', 'Other']],
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Patient.belongsTo(User, { foreignKey: 'userId' });

module.exports = Patient;
