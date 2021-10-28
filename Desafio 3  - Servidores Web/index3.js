const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");

let info = null;

const data = app.get("/", (req, res) => {
  res.send(
    "<h1>Please, do not use this directory. Use /productos || /productorandom</h1>"
  );
});

app.get("/productos", (req, res) => {
  fs.readFile("productos.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    info = JSON.parse(data);
    res.send(info);
  });
});
app.get("/productorandom", (req, res) => {
  fs.readFile("productos.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    info = JSON.parse(data);
    const randomProd = Math.floor(Math.random() * info.length);
    res.send(info[randomProd]);
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
