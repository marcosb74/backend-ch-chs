const mongoose = require("mongoose");
const productModel = new mongoose.Schema({
  nombre: {
    type: String,
  },
  precio: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});
module.exports = mongoose.model("Product", productModel);
