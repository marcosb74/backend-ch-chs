const express = require("express");
const router = express.Router();
const {
  infoController,
  homeController,
  randomController,
} = require("../controllers/info.controller");
const auth = require("../other/auth");

router.get("/home", auth, homeController);

router.get("/", infoController);

router.get("/randoms", randomController);

module.exports = router;
