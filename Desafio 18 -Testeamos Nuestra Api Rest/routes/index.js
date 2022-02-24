const express = require("express");
const router = express.Router();
const auth = require("./auth.route");
const info = require("./info.route");

router.use("/authentication", auth);
router.use("/information", info);

module.exports = router;
