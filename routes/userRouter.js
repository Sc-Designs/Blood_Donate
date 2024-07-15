var express = require("express");
var router = express.Router();
const {
  RegisterUser,
  LoginUser,
  LogOut,
} = require("../controllers/UserAuthController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).render("register");
});
router.get("/register", (req, res) => {
  let error = req.flash("error");
  res.render("register", { error });
});
router.post("/register", RegisterUser);
router.get("/login", (req, res) => {
  let error = req.flash("error");
  res.render("login", { error });
});
router.post("/login", LoginUser);

router.get("/logout", LogOut);

module.exports = router;
