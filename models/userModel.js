const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Patient', 'Doctor', 'Staff', 'Admin'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },refreshToken:{ 
         type: DataTypes.STRING, 
         allowNull: true 

    },
  },
  {
    timestamps: true,
  }
);
User.prototype.getJWTToken = function (expiresIn, secret) {
    return jwt.sign({ id: this.id, role: this.role }, secret, { expiresIn });
  };
  

module.exports = User;
