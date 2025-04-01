//This is my schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  age: { type: Number, required: true, min: 0, max: 100 },
  dob: { type: Date, required: true },
  password: { type: String, required: true, minlength: 8 },
  cpswd: { type: String, required: true, minlength: 8 },
  about: { type: String, maxlength: 5000 },
});

module.exports = mongoose.model("User", userSchema);