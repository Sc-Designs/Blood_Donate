const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose.set('debug', dbgr);

mongoose
  .connect(`${config.get("MONGODB")}/BloodWeb`)
  .then(function () {
    dbgr("MongoDB Connected...");
  })
  .catch(function (err) {
    console.error(err);
  });

module.exports = mongoose.connection;
