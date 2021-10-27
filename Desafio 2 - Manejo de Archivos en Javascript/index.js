/* Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre 
del archivo con el que va a trabajar e implemente los siguientes métodos:
 */
//#region  Class-Area
const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.name = fileName;
  }
  save(obj) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "There was an error while reading your file!";
      const info = eval(data);
      let maxId = 1;
      if (info !== undefined) {
        info.forEach((item) => {
          if (item.id >= maxId) {
            maxId = item.id;
          }
        });
        maxId++;
      }
      obj.id = maxId;
      info.push(obj);
      //this.deleteAll(); aca podria llamar a deleteAll para ahorrarme codigo pero van a salir los console.logs
      fs.unlink(this.name, (err) => {
        if (err) throw "there was an error when trying to delete your file";
      });
      fs.writeFile(this.name, "", "utf-8", (err) => {
        if (err) throw "there was an error when trying to create the new file";
      });
      fs.appendFile(this.name, JSON.stringify(info), "utf-8", (err) => {
        if (err) throw "There was an error while writing your file!";

        console.log("The element was sucessfully added!");
      });
    });
  }

  getById(id) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "There was an error while reading your file!";
      const info = eval(data);
      const match = info.find((item) => item.id === id);
      if (match) {
        console.log(match);
      } else {
        console.log("Item not found!");
      }
    });
  }
  getAll() {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "There was an error while reading your file!";
      console.log(data);
    });
  }
  deleteById(id) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "There was an error while reading your file!";
      const info = eval(data);
      const match = info.filter((item) => item.id !== id);

      fs.writeFile(this.name, JSON.stringify(match), "utf-8", (err) => {
        if (err) throw "Error en la escritura";

        console.log("The element was sucessfully deleted!");
      });
    });
  }
  deleteAll() {
    fs.unlink(this.name, (err) => {
      if (err) throw "there was an error when trying to delete your file";
      console.log("Your file has been deleted!");
    });
    fs.writeFile(this.name, "", "utf-8", (err) => {
      if (err) throw "there was an error when trying to create the new file";

      console.log("And now is empty.");
    });
  }
}
//#endregion
//#region Testin-Area
const myContenedor = new Contenedor("productos.txt");
const myObj = {
  title: "Lapiz",
  price: 100,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  id: "",
};
// - - -All methods work - - -

//myContenedor.getAll();
//myContenedor.getById(2);
//myContenedor.deleteById(1);
//myContenedor.deleteAll();
//myContenedor.save(myObj);

//#endregion
