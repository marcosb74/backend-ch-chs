const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const { Server } = require("socket.io");
const io = new Server(server);
// const knex = require("./src/db"); // KNEX DE MYSQL ( PRODUCTOS )
// const knex = require("./knexfile"); // KNEX DE SQL LITE 3 ( CHATS)

const arr = [
  {
    title: "Escuadra",
    price: 100,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    title: "Calculadora",
    price: 200,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Globo Terráqueo",
    price: 150,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
  {
    title: "Lapiz Mecanico",
    price: 45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
  },
  {
    title: "Calculadora Cientifica Casio",
    price: 74,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/logos-brands-4/24/logo_brand_brands_logos_google_keyboard-512.png",
  },
];

const msgs = [];

//Basic cfg
app.use(express.static(__dirname + "/public"));

server.listen(4000, () => {
  console.log("Server is running on port:" + PORT);
});

app.use(express.json());
//////
io.on("connection", (socket) => {
  console.log("User has joined successfully.");

  socket.emit("msg_back", msgs);

  socket.emit("data_ready", arr);

  socket.on("data_client", (data) => {
    msgs.push(data);
    //para enviarle a todos los nodos
    io.sockets.emit("msg_back", msgs);
    //#region Code for persisting the CHAT LOGS. PLEASE READ THE MSG ATTACHED FOR USAGE.
    // knex
    //   .from("logs")
    //   .select("*")
    //   .del()
    //   .then(() => {
    //     console.log("updated");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // knex("logs")
    //   .insert(msgs)
    //   .then(() => {
    //     console.log("Msgs from chat added successfully!").catch((err) => {
    //       console.log(err);
    //     });
    //   });
    //#endregion
  });

  socket.on("data_array", (data) => {
    arr.push(data);
    //#region Code for persisting the PRODUCTS LOG. PLEASE READ THE MSG ATTACHED FOR USAGE.
    // knex
    //   .from("prods")
    //   .select("*")
    //   .del()
    //   .then(() => {
    //     console.log("updated");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // //arr.map((item) => {
    // knex("prods")
    //   .insert(arr)
    //   .then(() => {
    //     console.log("Products from table added successfully!").catch((err) => {
    //       console.log(err);
    //     });
    //   });

    //#endregion
    io.sockets.emit("data_ready", arr);
  });

  //Rutas
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
