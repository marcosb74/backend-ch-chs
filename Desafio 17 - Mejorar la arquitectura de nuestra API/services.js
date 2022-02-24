const ProductsDao = require("./dao/productDaos");

class ProductsApi {
  constructor() {
    this.produtcDao = new ProductsDao();
  }
  async agregar(nombre, precio, stock) {
    const producto = {
      ...nombre,
      ...precio,
      ...stock,
    };
    let prNew = await this.produtcDao.add(producto);
    return prNew;
  }
  async todos() {
    let todos = await this.produtcDao.getAll();
    return todos;
  }
  async buscar(id) {
    let products;
    if (id) {
      products = await this.produtcDao.getById(id);
    } else {
      products = await this.produtcDao.getAll();
    }
    return products;
  }
  async borrar(id) {
    if (id) {
      await this.produtcDao.deleteById(id);
    } else {
      await this.produtcDao.DeleteAll();
    }
    return console.log("Se borro su seleccion ");
  }
  async reemplazar(id, newProduct) {
    let prUpdate = await this.produtcDao.updateById(id, newProduct);
    return prUpdate;
  }

  exit() {
    this.produtcDao.exit();
  }
}

module.exports = ProductsApi;
