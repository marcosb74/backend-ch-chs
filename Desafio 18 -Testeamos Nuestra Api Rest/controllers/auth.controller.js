const {
  registerService,
  logoutService,
  loggedService,
  getAllUsersService,
  getOneUserService,
  deleteOneUserService,
  updateOneUserService,
  signupService,
} = require("../services/auth.service");

const location = require("../viewHelper");
function registerController(req, res) {
  registerService();
  console.log(__dirname);
  res.sendFile("register.html", location);
}

function signUpController(req, res) {
  const data = signupService(req);
  res.json(data);
}
function logoutController(req, res) {
  logoutService();
  req.logOut();
  res.redirect("/login");
}
function loggedController(req, res) {
  const data = loggedService(req);
  res.json(data);
}
async function getAllUsersController(req, res) {
  const data = await getAllUsersService(req);
  res.json(data).status(200);
}
async function getOneUserController(req, res) {
  const data = await getOneUserService(req);
  res.json(data).status(200);
}
async function deleteOneUserController(req, res) {
  const data = await deleteOneUserService(req);
  res.json(data).status(200);
}
async function updateOneUserController(req, res) {
  const data = await await updateOneUserService(req);
  res.json(data).status(200);
}

module.exports = {
  registerController,
  signUpController,
  logoutController,
  loggedController,
  getAllUsersController,
  getOneUserController,
  deleteOneUserController,
  updateOneUserController,
};
