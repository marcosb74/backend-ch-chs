const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const productosRoute = require("./routes/api/productos/index");

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});

app.get("/", (req, res) => {
  res.send(`<h1>Uso:</h1>
  <h3>GET '/api/productos' -> devuelve todos los productos.</h3>
  <h3>GET '/api/productos/:id' -> devuelve un producto según su id.</h3>
  <h3>POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.</h3>
  <h3>PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.</h3>
  <h3>DELETE '/api/productos/:id' -> elimina un producto según su id. </h3>
`);
});
app.use("/api", productosRoute);
