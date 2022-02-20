const signupService = require("../services/auth.service");
const {
  registerService,
  logoutService,
  loggedService,
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

module.exports = {
  registerController,
  signUpController,
  logoutController,
  loggedController,
};
