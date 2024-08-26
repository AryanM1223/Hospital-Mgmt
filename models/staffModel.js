const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require('./models/userModel');

const Staff = sequelize.define(
  "staff",
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
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Staff.belongsTo(User, { foreignKey: 'userId' });

module.exports = Staff;
