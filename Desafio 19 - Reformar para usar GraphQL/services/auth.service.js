const loggerConsole = require("../other/loggerSetup");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  userExists,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  signUpUser,
} = require("../db/auth.persistency");

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
    const userCreated = signUpUser(user);
    return userCreated;
  }
}
function logoutService() {
  loggerConsole.trace("La ruta /register obtuvo una peticion");
}

function userService() {
  loggerConsole.trace("La ruta /user obtuvo una peticion");
}

function loggedService(req, res) {
  const usuario = req.user.pop().username;
  const data = {
    username: usuario,
  };
  res.send(data);
}

async function getAllUsersService(req, res) {
  const users = await getAllUsers();
  return users;
}

async function getOneUserService(req, res) {
  console.log(req.params.id);
  const users = await getOneUser(req.params.id);
  return users;
}
async function deleteOneUserService(req, res) {
  const users = await deleteOneUser(req.params.id);
  console.log(users);
  return users;
}
async function updateOneUserService(req, res) {
  const users = await updateOneUser(req);
  return users;
}

module.exports = {
  registerService,
  signupService,
  logoutService,
  loggedService,
  userService,
  getAllUsersService,
  getOneUserService,
  deleteOneUserService,
  updateOneUserService,
};
