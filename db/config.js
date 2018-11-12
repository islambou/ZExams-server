const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/zexams";

exports.db = {};
exports.setConnection = async () => {
  console.log("setting up connection with data base");
  await mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  exports.db = mongoose.connection;
};
