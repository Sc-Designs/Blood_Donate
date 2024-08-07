const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  Admin_Name: {
    type: String,
    required: true,
  },
  Admin_Email: {
    type: String,
    required: true,
    unique: true,
  },
  Admin_Password: {
    type: String,
    required: true,
  },
  Admin_Role: {
    type: String,
    enum: ["superadmin", "admin", "moderator"],
    default: "admin",
  },
  Admin_Status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  Admin_Created_At: {
    type: Date,
    default: Date.now,
  },
  Admin_Picture: Buffer,
  Admin_GST_No: String,
  Admin_Phone: {
    type: String,
    required: true,
  },
  Last_Login: {
    type: Date,
    default: Date.now,
  },
  Permissions: {
    type: Array,
    default: [],
  },
  Address: String,
  Verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Admin_Model", AdminSchema);
