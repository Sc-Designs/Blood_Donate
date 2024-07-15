var express = require("express");
var router = express.Router();
const IsLoggedIn = require("../middleware/IsloggedIn");
const User_Model = require("../models/User-Model")

// Define a GET route for the root URL ("/")

router.get("/", function(req, res) {
  // Send a JSON response with a greeting message
  res.status(200).render('index')
});

router.get("/profile", IsLoggedIn, async (req, res) => {
  const user = await User_Model.findOne(req.user);
  res.status(200).render("profile", { user: user });
});

module.exports = router;