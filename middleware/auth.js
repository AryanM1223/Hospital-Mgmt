const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const accessToken = req.headers["authorization"];

  // Check if neither token exists
  if (!accessToken && !refreshToken) {
    return next(new ErrorHandler("Access Denied. No token provided.", 401));
  }

  try {
    // Check if there's an access token and remove 'Bearer ' from the token
    if (accessToken && accessToken.startsWith("Bearer ")) {
      const token = accessToken.substring(7); // Remove 'Bearer ' from the token
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded token ID
      req.user = await User.findById(decodedData.id);

      if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
      }

      next();
    } else {
      // If there's no access token or it's invalid, check for the refresh token
      if (!refreshToken) {
        return next(new ErrorHandler("Access Denied. No refresh token provided.", 401));
      }

      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
          return next(new ErrorHandler("User not found", 404));
        }

        // Generate a new access token using user's details
        const newAccessToken = user.getJWTToken(process.env.JWT_EXPIRY, process.env.JWT_SECRET);

        // Update the header with the new access token
        res.header("Authorization", `Bearer ${newAccessToken}`);
        req.user = user;

        next();
      } catch (error) {
        return next(new ErrorHandler("Invalid refresh token.", 400));
      }
    }
  } catch (error) {
    return next(new ErrorHandler("Invalid access token.", 400));
  }
};
