var express = require("express");
var router = express.Router();

router.get("/donar", function (req, res) {
  res.send("i am Donar");
});

module.exports = router;
