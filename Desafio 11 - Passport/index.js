const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/Usuario");
const mongoose = require("mongoose");
const mongodbcfg = require("./db");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");

mongoose.connect(mongodbcfg.cnxStr);
app.listen(4000, () => {
  console.log("server is running on port 4000");
});

// BASIC CFG
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
app.use(passport.initialize());
app.use(passport.session());

//------ middleware

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

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
      return;
    }
  })
);

// SERIALIZACION
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// DESERIALIZACION
passport.deserializeUser(async (id, done) => {
  const isOnDb = await User.find({ id });
  done(null, isOnDb);
});

//----- ROUTING
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  if (req.body.username === "" || req.body.password === "") {
    res.send("there are missing fields");
  }
  // CHECKING IF IT EXISTS
  const isOnDb = await User.find({
    username: req.body.username,
  });
  console.log(isOnDb);
  if (!isOnDb === []) {
    res.send("The user already exists on the DB");
    return;
  } else {
    //REGISTERING NEW USER.
    let passwordHash = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({
      _id: uuid4(),
      username: req.body.username,
      password: passwordHash,
    });
    return user;
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

app.get("/home", auth, (req, res) => {
  //res.send("Hola! " + req.user.pop().username + " Bienvenido :)");
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/", (req, res) => {
  res.redirect("/login");
});
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

app.get("/logged", (req, res) => {
  const usuario = req.user.pop().username;
  const data = {
    username: usuario,
  };
  res.send(data);
});
