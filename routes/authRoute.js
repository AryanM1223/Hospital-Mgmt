const express = require('express');
const router = express.Router();
const {loginUser,registerUser} = require('../controllers/authController');
const isAUthenticated = require('../middleware/auth')

router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;