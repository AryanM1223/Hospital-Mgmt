const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { activityLogger, errorLogger } = require('./utils/logger');
const authRoute = require('./routes/authRoute');
const { sequelize } = require('./config/db'); 
const cors = require("cors");


dotenv.config({ path: './config/config.env' });


const CORS_URL = process.env.CORS_URL || "http://localhost:5171";


const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CORS_URL);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Register Routes
app.use('/auth', authRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  errorLogger.error(err.stack);
  res.status(500).json({ error: err.message });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    activityLogger.info('Database connected and models synchronized.');
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    errorLogger.error('Error connecting to the database or synchronizing models:', error);
    console.error('Error connecting to the database or synchronizing models:', error);
  }
});
