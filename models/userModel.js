const mongoose = require("mongoose");
const Crypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Crypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide your name"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 5,
  },
});

UserSchema.pre("save", async function () {
  const salt = await Crypt.genSalt(10);
  this.password = await Crypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_VALIDITY }
  );
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatching = await Crypt.compare(userPassword, this.password);
  return isMatching;
};

module.exports = mongoose.model("User", UserSchema);
