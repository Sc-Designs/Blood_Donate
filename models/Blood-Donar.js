const mongoose = require("mongoose");
const BloodSchema = mongoose.Schema({
  Capacity_Blood: {
    type: Number,
    required: true,
  },
  Blood_Group: {
    type: String,
    required: true,
  },
  Rh_Factor: {
    type: String,
    required: true,
  },
  Donated_By: {
    type: String,
    required: true,
  },
  Donated_Date: {
    type: Date,
    required: true,
  },
  Doner_Weight: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone_Number: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Addhar_Number: {
    type: String,
    required: true,
    unique: true,
  },
  Dob: {
    type: String,
    required: true,
  },
  Verification_Status: {
    type: Boolean,
    default: false,
  },
  Blood_Status: {
    type: String,
    enum: ["available", "used", "expired"],
    default: "available",
  },
  Blood_Storage_Location: {
    type: String,
    required: true,
  },
  Donor_Medical_History: {
    type: Array,
    default: [],
  },
  Last_Updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blood", BloodSchema);
