const e = require("express");
const express = require("express");
const fs = require("fs");
const { Router } = express;
const router = new Router();

router.get("/productos", (req, res) => {
  fs.readFile("routes/api/productos/productos.txt", "utf-8", (err, data) => {
    if (err) throw `There was an error while reading your file!`;
    info = JSON.parse(data);
    res.send(info);
  });
});

router.get("/productos/:id", (req, res) => {
  fs.readFile("routes/api/productos/productos.txt", "utf-8", (err, data) => {
    try {
      if (err) throw "There was an error while reading your file!";
      info = JSON.parse(data);
      const product = info.find((item) => {
        return item.id.toString() === req.params.id;
      });
      if (!product) {
        res.send("<h1>Producto no encontrado!</h1>");
      }
      res.send(product);
    } catch (error) {
      res.send(error);
    }
  });
});

router.post("/productos/", (req, res) => {
  fs.readFile("routes/api/productos/productos.txt", "utf-8", (err, data) => {
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
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      id: maxId,
    };
    info.push(obj);
    fs.unlink("routes/api/productos/productos.txt", (err) => {
      if (err) throw "there was an error when trying to delete your file";
    });
    fs.writeFile("routes/api/productos/productos.txt", "", "utf-8", (err) => {
      if (err) throw "there was an error when trying to create the new file";
    });
    fs.appendFile(
      "routes/api/productos/productos.txt",
      JSON.stringify(info),
      "utf-8",
      (err) => {
        if (err) throw "There was an error while writing your file!";
      }
    );
    res.send("Su producto fue agregado con exito!");
  });
});
router.put("/productos/:id", (req, res) => {
  fs.readFile("routes/api/productos/productos.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    const info = JSON.parse(data);
    let existProduct = info.find((item) => {
      return item.id.toString() === req.params.id;
    });
    if (!existProduct) {
      res.send("<h1>Producto no encontrado!</h1>");
      return;
    }
    const newProduct = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      id: Number(req.params.id),
    };
    const newArr = info.map((product) => {
      if (req.params.id == product.id) {
        return newProduct;
      } else {
        return product;
      }
    });
    fs.unlink("routes/api/productos/productos.txt", (err) => {
      if (err) throw "there was an error when trying to delete your file";
    });
    fs.writeFile("routes/api/productos/productos.txt", "", "utf-8", (err) => {
      if (err) throw "there was an error when trying to create the new file";
    });
    fs.appendFile(
      "routes/api/productos/productos.txt",
      JSON.stringify(newArr),
      "utf-8",
      (err) => {
        if (err) throw "There was an error while writing your file!";
      }
    );
    res.send("Su producto fue modificado con exito!");
  });
});
router.delete("/productos/:id", (req, res) => {
  fs.readFile("routes/api/productos/productos.txt", "utf-8", (err, data) => {
    if (err) throw "There was an error while reading your file!";
    const info = JSON.parse(data);
    const exists = info.find((item) => {
      return item.id.toString() === req.params.id;
    });
    if (!exists) {
      res.send("<h1>Producto no encontrado!</h1>");
      return;
    } else {
      const match = info.filter((item) => item.id.toString() !== req.params.id);
      fs.writeFile(
        "routes/api/productos/productos.txt",
        JSON.stringify(match),
        "utf-8",
        (err) => {
          if (err) throw "Error en la escritura";
          console.log("The element was sucessfully deleted!");
        }
      );
      res.send("<h1>El elemento se elimino correctamente!</h1>");
    }
  });
});

module.exports = router;
