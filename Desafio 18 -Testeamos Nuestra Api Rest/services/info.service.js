const loggerConsole = require("../other/loggerSetup");
const parseArgs = require("minimist");
const { fork } = require("child_process");
// ----------------
function welcomeService(req, res) {
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
}
function homeService() {
  loggerConsole.trace("La ruta /home recibio una peticion");
}
function randomController(req, res) {
  loggerConsole.trace("La ruta /randoms recibio una peticion");
  const numbers = 100000000;
  let myFnx = fork("../other/index.js");
  if (req.query.cant) {
    numbers = Number(req.query.cant);
  }
  myFnx.send(numbers);
  myFnx.on("message", (total) => {
    res.send(total);
  });
}
module.exports = { welcomeService, homeService, randomController };
