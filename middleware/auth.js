const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const { verifyToken } = require("../utils/jwtToken");

exports.isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  const { refreshToken } = req.cookies;

  if (!authorization && !refreshToken) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const token = authorization?.split(" ")[1]; 
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Access denied. No refresh token provided." });
    }

    try {
      const decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET);
      const user = await User.findByPk(decoded.id);
      const newAccessToken = user.getJWTToken(process.env.JWT_EXPIRY, process.env.JWT_SECRET);
      req.user = user;
      res.header("Authorization", newAccessToken);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token." });
    }
  }
};

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
