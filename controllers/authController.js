const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
