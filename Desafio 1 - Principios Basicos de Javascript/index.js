/* >> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

 */
//#region User declaration
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return console.log(`${this.nombre} ${this.apellido}`);
  }
  addMascota(pet) {
    if (!pet) return;
    this.mascotas.push(pet);
    console.log(`Your new pet ${pet} has been added to the array! `);
    console.log(this.mascotas);
  }
  countMascotas() {
    return console.log(
      `there are a total of: ${this.mascotas.length} pets in your array!`
    );
  }
  addBook(title, author) {
    this.libros.push({ title: title, author: author });
    return console.log(
      `Your new book ${title} written by ${author} has been added! `
    );
  }
  getBookNames() {
    return console.log(this.libros.map((title) => title.title));
  }
}
//#endregion

//#region Testing Area

const miUsuario = new Usuario(
  "Marcos",
  "Balbuena",
  [{ title: "The Catcher in the Rye", author: "J.D Salinger" }],
  ["Shiro"]
);
miUsuario.getFullName();
miUsuario.addMascota("Kuro");
miUsuario.countMascotas();
miUsuario.addBook("Don Quixote", "Miguel de Cervantes");
miUsuario.getBookNames();
//#endregion
