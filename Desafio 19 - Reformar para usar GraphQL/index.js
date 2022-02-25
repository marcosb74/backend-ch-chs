const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/Usuario");
const mongoose = require("mongoose");
const mongodbcfg = require("./db");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const compression = require("compression");
const routes = require("./routes/index");

mongoose.connect(mongodbcfg.cnxStr);

// BASIC CFG
app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(
  session({
    secret: "SECRETO",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/api", routes);
app.use(passport.initialize());
app.use(passport.session());

// - - -PASSPORT
// Sign In

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    // VALIDAR
    try {
      const isOnDb = await User.findOne({
        username,
      });
      let hashOnDb = isOnDb.password;
      let compare = bcrypt.compare(password, hashOnDb);
      if (compare) {
        done(null, isOnDb);
        return;
      }
      done(null, false);
    } catch (error) {
      console.log("Usuario no registrado");
      loggerFileError.error("Error en passport");
      return;
    }
  })
);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
