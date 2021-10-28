const express = require("express");
const path = require("path");
const fs = require("fs");

let info = null;
const app = express();
const PORT = process.env.PORT || 8080;

class Contenedor {
  constructor(fileName) {
    this.name = fileName;
  }
  productos(res) {
    res.sendFile(this.name);
  }
  productorandom(res) {
    console.log(this.name);
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "There was an error while reading your file!";

      info = JSON.parse(data);
      const randomProd = Math.floor(Math.random() * info.length);
      res.json(info[randomProd]);
    });
  }
}

app.get("/", (req, res) => {
  res.send(
    "<h1>Please, do not use this directory. Use /productos || /productorandom</h1>"
  );
});

app.get("/productos", (req, res) => {
  const container = new Contenedor(path.join(__dirname + "/productos.txt"));
  container.productos(res);
});
app.get("/productorandom", (req, res) => {
  const container = new Contenedor(path.join(__dirname + "/productos.txt"));
  container.productorandom(res);
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
