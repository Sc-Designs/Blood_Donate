const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign({ Email: user.Email, id: user._id }, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;
