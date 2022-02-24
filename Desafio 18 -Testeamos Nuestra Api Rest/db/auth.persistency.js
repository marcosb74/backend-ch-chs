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
async function getAllUsers() {
  return await User.find({});
}

async function getOneUser(id) {
  return await User.findById(id);
}
async function deleteOneUser(id) {
  const user = await User.findById(id);
  await user.remove();

  return `User with ID  ${id} has been deleted`;
}
async function updateOneUser(req, res) {
  const newUserData = {
    color: req.body.color,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return `User's color now is ${req.body.color} and it has been updated`;
}

module.exports = {
  userExists,
  signUpUser,
  getOneUser,
  getAllUsers,
  deleteOneUser,
  updateOneUser,
};
