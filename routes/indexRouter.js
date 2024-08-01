var express = require("express");
var router = express.Router();
const IsLoggedIn = require("../middleware/IsloggedIn");
const User_Model = require("../models/User-Model");
var upload = require("../config/multer-config");

router.get("/", function (req, res) {
  res.status(200).render("index");
});

router.get("/profile", IsLoggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const user = await User_Model.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    let base64Image;
    if (user.image) {
      base64Image = user.image.toString("base64");
    }

    res.status(200).render("profile", { user: user, base64Image: base64Image });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/upload", upload.single("image"), async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const { email} = req.body;
    let user = await User_Model.findOne({ Email: email });
    
    if(user){
    user.image = req.file.buffer;
    await user.save();
    return res.status(200).render("/profile");
    } else {
      return res.status(406).redirect("/profile");
    }

    res.status(200).redirect("/profile");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/map", function (req, res) {
  res.status(200).render("map");
});

router.get("/feed", function (req, res) {
  res.status(200).render("feed");
});

router.get("/feedback", IsLoggedIn, function (req, res) {
  res.status(200).render("feedback");
});

router.get("/:anything", function (req, res, next) {
  res.status(200).render("error");
});

module.exports = router;
