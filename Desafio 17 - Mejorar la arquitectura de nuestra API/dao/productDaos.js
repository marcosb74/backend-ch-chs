const CustomError = require("../error/customError");
const Product = require("../models/Product");
class ProductsDao {
  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new CustomError(500, "el metodo GetAll fallo!" + error);
    }
  }
  async getById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw new CustomError(500, "el metodo getById fallo!" + error);
    }
  }
  async add(producto) {
    try {
      const product = await Product.create({
        nombre: String(producto.nombre),
        precio: Number(producto.precio),
        stock: Number(producto.stock),
      });
      return product;
    } catch (error) {
      throw new CustomError(500, "el metodo add fallo!" + error);
    }
  }
  async deleteById(id) {
    try {
      const product = await Product.findById(id);
      await product.deleteOne();
    } catch (error) {
      throw new CustomError(500, "el metodo deleteById fallo!" + error);
    }
  }
  async DeleteAll() {
    try {
      await Product.delete({});
    } catch (error) {
      throw new CustomError(500, "el metodo deleteAll fallo!" + error);
    }
  }
  async updateById(id, productnew) {
    try {
      let product = await Product.findById(id);
      product = await Product.findByIdAndUpdate(id, productnew, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new CustomError(500, "el metodo updateById fallo!" + error);
    }
  }
}
module.exports = ProductsDao;
