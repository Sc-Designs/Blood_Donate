const User_Model = require("../models/User-Model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/GenerateToken");

module.exports.RegisterUser = async function (req, res, next) {
  try {
    let {
      Fullname,
      Gender,
      password,
      Dob,
      Occupation,
      Age,
      Address,
      Contact,
      BloodGroup,
      Relation,
      Email,
      Addhar_Number,
      Ename,
      Ephone,
      Relationship,
    } = req.body;
    let existingUser = await User_Model.findOne({ Email: Email });
    if (existingUser)
      return res.status(406).send("You already have an account, please Login!");
    else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.status(500).send("Error in hashing password");
          else {
            let newUser = await User_Model.create({
              Fullname,
              Gender,
              password: hash,
              Dob,
              Occupation,
              Age,
              Address,
              Contact,
              BloodGroup,
              Relation,
              Email,
              Addhar_Number,
              EmergencyContact: {
                name: Ename,
                phone: Ephone,
                relationship: Relationship,
              },
            });
            let Token = generateToken(newUser);
            res.cookie("token", Token);

            res.status(201).send("User registered successfully");
          }
        });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(503).send("Service Unavailable");
  }
};
module.exports.LoginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await User_Model.findOne({ Email: email });
  if (!user)
    return res.status(406).send("Oops your email or password was incorrect!");
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (isMatch) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      return res.status(406).send("Oops your email or password was incorrect!");
    }
  });
};
module.exports.LogOut = (req, res) => {
  res.cookie("token", "");
  res.status(200).redirect("/users/login");
};
