const mongoose = require("mongoose");

// Wrap Mongoose around local connection. Connection uses buzzsocial DB.
mongoose.connect("mongodb://127.0.0.1:27017/buzzsocialDB");

// Export connection
module.exports = mongoose.connection;
