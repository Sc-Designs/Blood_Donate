const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  Fullname: String,
  Gender: String,
  password: String,
  Dob: String,
  Occupation: String,
  Birth_Mark: {
    type: String,
    default: "No Mark",
  },
  Age: Number,
  Address: String,
  Contact: Number,
  BloodGroup: String,
  Relation: String,
  Email: String,
  Addhar_Number: {
    type: Number,
    unique: true,
    required: true,
  },
  DonationDate: {
    type: Array,
    default: [],
  },
  Status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  LastDonationDate: {
    type: Array,
    default: [],
  },
  DonationCount: {
    type: Number,
    default: 0,
  },
  Donation_History: {
    type: Array,
    default: [],
  },
  Picture: Buffer,
  Verified: {
    type: Boolean,
    default: false,
  },
  Role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
  ContactPreferences: {
    type: String,
    enum: ["email", "phone", "both"],
    default: "both",
  },
  MedicalHistory: {
    type: Array,
    default: [],
  },
  EmergencyContact: {
    name: String,
    phone: Number,
    relationship: String,
  },
  AvailabilityStatus: {
    type: Boolean,
    default: true,
  },
  LastLogin: {
    type: Date,
    default: Date.now,
  },
  PreferredDonationTimes: {
    type: String,
    default: "Anytime",
  },
  AddressVerified: {
    type: Boolean,
    default: false,
  },
  Notes: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User_Model", UserSchema);
