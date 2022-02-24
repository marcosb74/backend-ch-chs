const minimist = require("minimist");

const ProductsApi = require("./services");

const MongoClient = require("./db/monclient");
let clientDb = new MongoClient();
clientDb.connect();

let productApi = new ProductsApi();
const argv = minimist(process.argv.slice(2));
const { cmd, id, nombre, precio, stock } = argv;

//node index.js --cmd agregar --nombre "regla" --precio "10" --stock "10" - example of cmd
const ejecucion = async () => {
  try {
    switch (cmd.toLowerCase()) {
      case "buscar":
        console.log(await productApi.buscar(id));
        break;
      case "agregar":
        console.log(await productApi.agregar({ nombre, precio, stock }));
        break;
      case "reemplazar":
        console.log(await productApi.reemplazar(id, { nombre, precio, stock }));
        break;
      case "todos":
        console.log(await productApi.todos());
        break;
      case "borrar":
        await productApi.borrar(id);
        break;
      default:
        console.log("Comando no valido ", cmd);
    }
  } catch (err) {
    console.log(err);
  }
};

ejecucion();
