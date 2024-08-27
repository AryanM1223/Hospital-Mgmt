const { Pool } = require('pg');
const { activityLogger, errorLogger } = require('../utils/logger');



const pool = new Pool({
    user: 'postgres',
    password: 'aryan',
    host: 'localhost',
    port: 6000,  
    database: 'HospitalDb' 
});

(async () => {
    try {
        const client = await pool.connect();
        activityLogger.info("Database connected");
        console.log('Database connected successfully');
        
      
        client.release();
    } catch (error) {
        errorLogger.error("Database connection failed:",error);
        console.log('Database connection failed:', error);
    }
})();
