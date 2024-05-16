var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get("/feed", function (req, res, next) {
  res.send("Welcome feed!");
});
router.get("/blood", function (req, res, next) {
  res.send("Welcome blood!");
});
router.get("/report", function (req, res, next) {
  res.send("Welcome report!");
});

module.exports = router;
