const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('../models/userModel'); 

const Patient = sequelize.define('Patient', {
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
  zipCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
 
}, {
  timestamps: true,
});

Patient.belongsTo(User, { foreignKey: 'userId' });

module.exports = Patient;
