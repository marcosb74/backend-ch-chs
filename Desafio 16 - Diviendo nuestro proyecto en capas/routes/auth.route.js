const express = require("express");
const router = express.Router();
const {
  registerController,
  signUpController,
  logoutController,
  loggedController,
} = require("../controllers/auth.controller");

router.get("/register", registerController);

router.post("/register", signUpController);

router.get("/logout", logoutController);

router.get("/logged", loggedController);

module.exports = router;
