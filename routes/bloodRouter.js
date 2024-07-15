var express = require("express");
var router = express.Router();
/* GET reciver listing. */
router.get("/", function (req, res, next) {
  res.status(200).send("reciver");
});
module.exports = router;
