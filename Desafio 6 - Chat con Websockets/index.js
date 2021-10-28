const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");

const arr = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
  {
    title: "Lapiz Mecanico",
    price: 45.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
  },
  {
    title: "Calculadora Cientifica Casio",
    price: 74.67,
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

    fs.unlink("chatlog.txt", (err) => {
      if (err) throw "there was an error when trying to delete your file";
    });
    fs.writeFile("chatlog.txt", "", "utf-8", (err) => {
      if (err) throw "there was an error when trying to create the new file";
    });
    fs.appendFile("chatlog.txt", JSON.stringify(msgs), "utf-8", (err) => {
      if (err) throw "There was an error while writing your file!";

      console.log("The element was sucessfully added!");
    });
  });

  socket.on("data_array", (data) => {
    arr.push(data);
    io.sockets.emit("data_ready", arr);
  });

  //Rutas
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
