const mongosee = require("mongoose");
const CustomError = require("../error/customError");
const Config = require("../config/config");

class MymongoClient {
  constructor() {
    this.conected = false;
    this.client = mongosee;
  }

  async connect() {
    try {
      await this.client.connect(Config.host + Config.name);
      console.log("Base de datos conectada");
    } catch (err) {
      throw new CustomError(500, "Error al conectarse a mongo");
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      console.log("Base de datos desconectada");
    } catch (err) {
      throw new CustomError(500, "Error al conectarse a mongo 2");
    }
  }
}

module.exports = MymongoClient;
