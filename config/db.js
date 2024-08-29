const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('HospitalDb', 'postgres', 'aryan', {
  host: 'localhost',
  port: 6000,
  dialect: 'postgres',
  logging: false, // Set to true if you want to see SQL queries
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

module.exports = { sequelize };
