const User_Model = require("../models/User-Model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/GenerateToken");
const jwt = require("jsonwebtoken");

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
// module.exports.LoginUser = async (req, res) => {
//   try {
//     // Extract email and password from request body
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User_Model.findOne({ Email: email });

//     // If user is not found, send 401 Unauthorized response
//     if (!user) {
//       return res.status(401).send("Incorrect email or password.");
//     }

//     // Compare the provided password with the stored hashed password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         // Handle bcrypt comparison errors
//         console.error("Bcrypt error:", err);
//         return res.status(500).send("Server error.");
//       }

//       if (isMatch) {
//         // Generate a JWT token
//         const token = generateToken(user);

//         // Set the token as a cookie
//         res.cookie("token", token, {
//           httpOnly: true, // Helps prevent XSS attacks
//           secure: process.env.NODE_ENV === "production", // Only set cookie over HTTPS in production
//           sameSite: "Strict", // Helps prevent CSRF attacks
//         });

//         // Log the redirection attempt for debugging
//         console.log("Redirecting to /profile");

//         // Redirect to profile page
//         return res.status(200).redirect("/profile");
//       } else {
//         // If passwords don't match, send 401 Unauthorized response
//         return res.status(401).send("Incorrect email or password.");
//       }
//     });
//   } catch (err) {
//     // Log the error and send a 500 Internal Server Error response
//     console.error("Login error:", err);
//     return res.status(500).send("Server error.");
//   }
// };
module.exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User_Model.findOne({ Email: email });

    if (!user) {
      return res
        .status(401)
        .send("Oops, your email or password was incorrect!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ email: user.Email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true, secure: false }); // Secure should be false in dev
      return res.status(200).redirect("/profile");
    } else {
      return res
        .status(401)
        .send("Oops, your email or password was incorrect!");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.LogOut = (req, res) => {
  res.cookie("token", "");
  res.status(200).redirect("/users/login");
};
