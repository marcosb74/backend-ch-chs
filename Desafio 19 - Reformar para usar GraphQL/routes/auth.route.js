const express = require("express");
const router = express.Router();
const {
  registerController,
  signUpController,
  logoutController,
  loggedController,
  getAllUsersController,
  getOneUserController,
  deleteOneUserController,
  updateOneUserController,
} = require("../controllers/auth.controller");

router.get("/register", registerController);

router.post("/register", signUpController);

router.get("/logout", logoutController);

router.get("/logged", loggedController);

router.get("/users", getAllUsersController);
router.get("/users/:id", getOneUserController);
router.delete("/users/:id", deleteOneUserController);
router.put("/users/:id", updateOneUserController);

module.exports = router;
