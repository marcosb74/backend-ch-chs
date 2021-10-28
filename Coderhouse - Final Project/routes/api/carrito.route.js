const express = require("express");
const fs = require("fs");

const router = express.Router();

router.post("/", (req, res) => {
  fs.readFile(__dirname + "../../../carrito.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    const info = JSON.parse(data);
    let maxId = 1;
    if (info) {
      info.forEach((item) => {
        if (item.id >= maxId) {
          maxId = item.id;
        }
      });
      maxId++;
    }
    console.log(req.body);
    const obj = {
      id: maxId,
      timestamp: new Date().toLocaleString(),
      productos: [],
    };
    info.push(obj);
    fs.unlink(__dirname + "../../../carrito.txt", (err) => {
      if (err) throw "there was an error when trying to delete your file";
    });
    fs.writeFile(__dirname + "../../../carrito.txt", "", "utf-8", (err) => {
      if (err) throw "there was an error when trying to create the new file";
    });
    fs.appendFile(
      __dirname + "../../../carrito.txt",
      JSON.stringify(info, null, 2),
      "utf-8",
      (err) => {
        if (err) throw "There was an error while writing your file!";
      }
    );
    res.send("Su Carrito fue agregado con exito!");
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile(__dirname + "../../../carrito.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    const info = JSON.parse(data);
    const exists = info.find((item) => {
      return item.id.toString() === req.params.id;
    });
    if (!exists) {
      res.send("<h1>Carrito no encontrado!</h1>");
      return;
    } else {
      const match = info.filter((item) => item.id.toString() !== req.params.id);
      fs.writeFile(
        __dirname + "../../../carrito.txt",
        JSON.stringify(match, null, 2),
        "utf-8",
        (err) => {
          if (err) throw "Error en la escritura";
          console.log("The element was sucessfully deleted!");
        }
      );
      res.send("<h1>El Carrito se elimino correctamente!</h1>");
    }
  });
});

router.get("/:id/productos", (req, res) => {
  fs.readFile(__dirname + "../../../carrito.txt", "utf-8", (err, data) => {
    if (err) throw `There was an error while reading your file!`;
    const info = JSON.parse(data);
    const cart = info.find((item) => item.id.toString() === req.params.id);
    if (!cart) {
      res.send("<h1>Carrito no encontrado!</h1>");
    } else {
      res.send(cart.productos);
    }
  });
});

router.post("/:id/productos", (req, res) => {
  fs.readFile(__dirname + "../../../carrito.txt", "utf-8", (err, data) => {
    if (err) throw `There was an error while reading your file!`;
    const info = JSON.parse(data);
    const cart = info.find((item) => item.id.toString() === req.params.id);
    if (!cart) {
      res.send("<h1>Carrito no encontrado!</h1>");
    } else {
      let maxId = 1;
      cart.productos.forEach((item) => {
        if (item.id >= maxId) {
          maxId = item.id;
        }
        maxId++;
      });
      let items = {
        id: maxId,
        timestamp: new Date().toLocaleString(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock,
      };
      cart.productos.push(items);
      info.push(cart);
      fs.unlink(__dirname + "../../../carrito.txt", (err) => {
        if (err) throw "there was an error when trying to delete your file";
      });
      fs.writeFile(__dirname + "../../../carrito.txt", "", "utf-8", (err) => {
        if (err) throw "there was an error when trying to create the new file";
      });
      fs.appendFile(
        __dirname + "../../../carrito.txt",
        JSON.stringify(info, null, 2),
        "utf-8",
        (err) => {
          if (err) throw "There was an error while writing your file!";
        }
      );
      res.send("Su producto fue agregado con exito al carrito!");
    }
  });
});

router.delete("/:id/productos/:id_prod", (req, res) => {
  fs.readFile(__dirname + "../../../carrito.txt", "utf-8", (err, data) => {
    if (err) throw `There was an error while reading your file!`;
    const info = JSON.parse(data);
    const cart = info.find((item) => item.id.toString() === req.params.id);
    if (!cart) {
      res.send("<h1>Carrito no encontrado!</h1>");
    } else {
      const newInfo = info.filter(
        (item) => item.id.toString() !== req.params.id
      );
      const match = cart.productos.filter(
        (item) => item.id.toString() !== req.params.id_prod
      );
      cart.productos = match;
      newInfo.push(cart);
      console.log(newInfo);
      fs.writeFile(
        __dirname + "../../../carrito.txt",
        JSON.stringify(newInfo, null, 2),
        "utf-8",
        (err) => {
          if (err) throw "Error en la escritura";
          console.log("The element was sucessfully deleted!");
        }
      );
      res.send("<h1>El  producto se elimino del carrito correctamente!</h1>");
    }
  });
});

module.exports = router;
