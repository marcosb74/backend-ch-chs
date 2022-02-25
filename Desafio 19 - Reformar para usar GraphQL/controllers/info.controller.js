const welcomeService = require("../services/info.service");
const homeService = require("../services/info.service");
const randomService = require("../services/info.service");
const location = require("../viewHelper");

function infoController(req, res) {
  const data = welcomeService();
  res.json(data);
}

function homeController(req, res) {
  homeService();
  res.sendFile("home.html", location);
}
function randomController(req, res) {
  const data = randomService();
  res.json(data);
}

module.exports = { infoController, homeController, randomController };
