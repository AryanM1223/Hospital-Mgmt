const jwt = require("jsonwebtoken");

exports.generateToken = (user, secret, expiresIn) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    secret,
    { expiresIn }
  );
};

exports.verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid token");
  }
};
