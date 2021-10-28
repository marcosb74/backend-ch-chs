//#region HANDLEBARS
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const arr = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
  {
    title: "Lapiz Mecanico",
    price: 45.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
    id: 4,
  },
  {
    title: "Calculadora Cientifica Casio",
    price: 74.67,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/logos-brands-4/24/logo_brand_brands_logos_google_keyboard-512.png",
    id: 5,
  },
];

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(
  "hbs",
  handlebars({
    layoutDirs: __dirname + "/handlebars/views/layouts",
    extname: "hbs",
  })
);

app.set("views", __dirname + "/handlebars/views");
app.set("view engine", "hbs");

//Rutas

app.get("/productos", (req, res) => {
  res.render("main", { layout: "home", data: arr });
});

app.post("/productos", (req, res) => {
  let obj = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  arr.push(obj);
  res.redirect("/productos");
});

app.get("/formulario", (req, res) => {
  res.render("form", { layout: "home" });
});

//#endregion

//#region PUG
/* const express = require("express");
const app = express();

app.set("views", __dirname + "/pug/views");
app.set("view engine", "pug");

const arr = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
  {
    title: "Lapiz Mecanico",
    price: 45.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
    id: 4,
  },
  {
    title: "Calculadora Cientifica Casio",
    price: 74.67,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/logos-brands-4/24/logo_brand_brands_logos_google_keyboard-512.png",
    id: 5,
  },
];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.get("/productos", (req, res) => {
  res.render("index", { data: arr });
});

app.post("/productos", (req, res) => {
  let obj = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  arr.push(obj);
  res.redirect("/productos");
});

app.get("/formulario", (req, res) => {
  res.render("form", { layout: "home", data: arr });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
}); */
//#endregion

//#region ejs
/* const express = require("express");
const app = express();

app.set("views", __dirname + "/ejs/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const arr = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
  {
    title: "Lapiz Mecanico",
    price: 45.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
    id: 4,
  },
  {
    title: "Calculadora Cientifica Casio",
    price: 74.67,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/logos-brands-4/24/logo_brand_brands_logos_google_keyboard-512.png",
    id: 5,
  },
];
//Rutas
app.get("/productos", (req, res) => {
  res.render("index", { data: arr });
});

app.post("/productos", (req, res) => {
  let obj = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  arr.push(obj);
  res.redirect("/productos");
});

app.get("/formulario", (req, res) => {
  res.render("form", { layout: "home", data: arr });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
}); */
//#endregion
