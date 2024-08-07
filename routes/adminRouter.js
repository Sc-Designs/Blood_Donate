var express = require("express");
var router = express.Router();

// Route to render the admin profile page
router.get("/user", (req, res) => {
  res.render("adminProfile");
});

module.exports = router;
