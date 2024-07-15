var express = require("express");
var router = express.Router();
const Admin_Model = require("../models/Admin")
/* GET admin listing. */
router.get("/", function (req, res, next) {
  res.status(201).send("admin");
});
if(process.env.NODE_ENV == "development") {
  router.post("/create",async (req, res) => {
    let admin = await Admin_Model.find();
    if (admin.length > 0 ) {
      return res
      .status(406)
      .send("You Don't have a permission to create Admin!");
    }
    let { Admin_Name, Admin_Email, Admin_Password, Admin_Role, Admin_Status,} = req.body;
    let CeateAdmin = await Admin_Model.create({
      Admin_Name,
      Admin_Email,
      Admin_Password,
      Admin_Role,
      Admin_Status,
      })
      res.status(201).send(CeateAdmin);
})
}
module.exports = router;
