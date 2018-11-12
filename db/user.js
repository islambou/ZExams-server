const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const USERS_COLLECTION = require("../consts/collections").USERS_COLLECTION;

const userSchema = new schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firsName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.virtual("passwordHash").set(function(value) {
  this.password = bcrypt.hashSync(value, 12);
  console.log("The hashed password" + this.password);
});
module.exports = mongoose.model(USERS_COLLECTION, userSchema, USERS_COLLECTION);
