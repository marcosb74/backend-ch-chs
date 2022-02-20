const loggerConsole = require("../other/loggerSetup");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const userExists = require("../db/auth.persistency");
const signUpUser = require("../db/auth.persistency");
const userCreated = require("../db/auth.persistency");
// ----------------
function registerService() {
  loggerConsole.trace("La ruta /register obtuvo una peticion");
}

async function signupService(req, res) {
  loggerConsole.trace("La ruta /register hizo un POST");
  if (req.body.username === "" || req.body.password === "") {
    res.send("there are missing fields");
  }

  // CHECKING IF IT EXISTS
  const exists = await userExists(req.body.username);
  console.log(exists);
  if (!exists === []) {
    loggerConsole.error("Error, este usuario esta en la DB");
    res.send("The user already exists on the DB");
    return;
  } else {
    //REGISTERING NEW USER.
    let passwordHash = await bcrypt.hash(req.body.password, 8);
    const user = {
      _id: uuid4(),
      username: req.body.username,
      password: passwordHash,
    };
    userCreated = signUpUser(user);
    return userCreated;
  }
}
function logoutService() {
  loggerConsole.trace("La ruta /register obtuvo una peticion");
}

function loggedService(req, res) {
  const usuario = req.user.pop().username;
  const data = {
    username: usuario,
  };
  res.send(data);
}

module.exports = {
  registerService,
  signupService,
  logoutService,
  loggedService,
};
