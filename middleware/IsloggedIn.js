const jwt = require("jsonwebtoken");
const User_Model = require("../models/User-Model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "You must be logged in first!");
      return res.redirect("/users/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User_Model.findOne({ Email: decoded.email }).select(
      "-password"
    );

    if (!user) {
      req.flash("error", "User not found!");
      res.clearCookie("token");
      return res.redirect("/users/login");
    }

    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.clearCookie("token");
    return res.redirect("/users/login");
  }
};
