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
const parseArgs = require("minimist");
const { fork } = require("child_process");
const compression = require("compression");
const log4js = require("log4js");

mongoose.connect(mongodbcfg.cnxStr);

// LOGGER CFG

log4js.configure({
  appenders: {
    loggerConsola: { type: "console" },
    loggerFile: { type: "file", filename: "warn.log" },
    loggerFile2: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["loggerConsola"], level: "trace" },
    archivo: { appenders: ["loggerFile"], level: "warn" },
    archivo2: { appenders: ["loggerFile2"], level: "error" },
  },
});

const loggerConsole = log4js.getLogger();
const loggerFileWarn = log4js.getLogger("archivo");
const loggerFileError = log4js.getLogger("archivo2");
// LOGGER END

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
      loggerFileError.error("Error en passport");
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

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
//----- ROUTING
app.get("/register", (req, res) => {
  loggerConsole.trace("La ruta /register obtuvo una peticion");
  res.sendFile(__dirname + "/views/register.html");
});

app.post("/register", async (req, res) => {
  loggerConsole.trace("La ruta /register hizo un POST");
  if (req.body.username === "" || req.body.password === "") {
    res.send("there are missing fields");
  }
  // CHECKING IF IT EXISTS
  const isOnDb = await User.find({
    username: req.body.username,
  });
  console.log(isOnDb);
  if (!isOnDb === []) {
    loggerFileError.error("Error, este usuario esta en la DB");
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
  loggerConsole.trace("La ruta /login obtuvo una peticion");
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
  loggerConsole.trace("La ruta /home recibio una peticion");
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/", (req, res) => {
  loggerConsole.trace("La ruta / recibio una peticion");
  res.redirect("/login");
});
app.get("/logout", (req, res) => {
  loggerConsole.trace("La ruta /logout recibio una peticion");
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
app.get("/info", (req, res) => {
  loggerConsole.trace("La ruta /info recibio una peticion");
  const options = { default: { nombre: "unNombre", apellido: "unApellido" } };
  console.log(parseArgs(process.argv, options));
  res.send(`<p>Ubicacion del proyecto </p>
            ${process.cwd()}
           <p>ID  del proceso </p> 
           ${process.pid}
           <p>Version de NODE</p> 
           ${process.version}
           <p>Sistema Operativo </p>
           ${process.platform}
           <p>Memoria Reservada RSS </p> 
           ${process.memoryUsage().rss}
           <p>PATH de ejecuccion de NODE
           ${process.execPath}
           <h3> Ver consola para ver los argumentos que se enviaron</h3>`);
});

app.get("/api/randoms", (req, res) => {
  loggerConsole.trace("La ruta /api/randoms recibio una peticion");
  let numbers = 100000000;
  let myFnx = fork("./other/index.js");
  if (req.query.cant) {
    numbers = Number(req.query.cant);
  }
  myFnx.send(numbers);
  myFnx.on("message", (total) => {
    res.send(total);
  });
});
app.get("*", function (req, res) {
  loggerFileWarn.warn("Se hizo una peticion a una ruta inexistente");
  res.status(404).send("Error! page not found");
});
