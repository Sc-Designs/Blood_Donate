const mongoose = require("mongoose");
const config = require("config");

const link = `${config.get("MONGODB_URI")}/BloodWeb`;
const dbgr = require("debug")("development:mongoose");

const connectWithRetry =  () => {
  mongoose.connect(link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    })
    .then(function () {
      dbgr("connect");
    })
    .catch(function (err) {
      dbgr(err)
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

connectWithRetry();

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Ensure the connection is established before performing database operations
mongoose.connection.once("open", () => {
  console.log("Mongoose connection open");
});

module.exports = mongoose.connection;
