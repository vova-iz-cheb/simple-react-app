const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// установка схемы
const userSchema = new Schema({
  login: String,
  salt: String,
  hash: String,
  reg_date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: "man2"
  }
});

module.exports = mongoose.model("User", userSchema);
