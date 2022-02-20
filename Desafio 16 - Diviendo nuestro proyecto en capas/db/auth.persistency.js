const User = require("../models/Usuario");
const mongoose = require("mongoose");

const mongodbcfg = require("../db");

mongoose.connect(mongodbcfg.cnxStr);
async function userExists(user) {
  const exists = await User.find({
    username: user,
  });
  return exists;
}
async function signUpUser(user) {
  return await User.create(user);
}

module.exports = {
  userExists,
  signUpUser,
};
