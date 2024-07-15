var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("i am Donar");
});

module.exports = router;
