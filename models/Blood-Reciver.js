const mongoose = require("mongoose");
const ReciverSchema = mongoose.Schema({
  Reciver_Name: {
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
  Blood_Group: {
    type: String,
    required: true,
  },
  Rh_Factor: {
    type: String,
    required: true,
  },
  Donar_Name: {
    type: Array,
    default: [],
  },
  Recive_Date: {
    type: Array,
    default: [],
  },
  Reciver_Weight: {
    type: String,
    required: true,
  },
  Recive_Place: {
    type: Array,
    default: [],
  },
  Reciver_Status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  Medical_History: {
    type: Array,
    default: [],
  },
  Emergency_Contact: {
    name: String,
    phone: String,
    relationship: String,
  },
  Verification_Status: {
    type: Boolean,
    default: false,
  },
  Notes: {
    type: String,
    default: "",
  },
  Created_At: {
    type: Date,
    default: Date.now,
  },
  Last_Updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reciver", ReciverSchema);
