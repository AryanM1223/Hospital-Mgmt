const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken'); // Ensure jwt is imported if used

const User = sequelize.define('User', { 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneNumber:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true,
  },
  profilePicUrl:{
    type:DataTypes.STRING,
    allowNull:false
  },
  isVerified:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  refreshToken: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
}, {
  timestamps: true,
});

User.prototype.getJWTToken = function (expiresIn, secret) {
  return jwt.sign({ id: this.id, role: this.role }, secret, { expiresIn });
};

module.exports = User;
