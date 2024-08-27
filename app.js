const express = require('express');
const pool = require('./config/db'); 
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { activityLogger, errorLogger } = require("./utils/logger");
dotenv.config({ path: "./config/config.env" });


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



const PORT = 6000 ;

app.listen(PORT,() => {
    activityLogger.info("Server running without hicks !!");
    console.log(`Server running on port ${PORT}`);
});