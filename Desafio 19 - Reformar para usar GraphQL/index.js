const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

app.listen(4000, () => {
  console.log("server is running on port 4k");
});

//schema
const schema = buildSchema(`

    type Product {
        id: Int,
        name: String,
        stock: Int
    }
    
    type Query {
        getProducts : [Product]
        getProductById(id:Int) : Product
    }
    type Mutation { 
        addProduct(name: String, stock: Int) : Product
        modifyProduct(id: Int, name: String, stock: Int) : Product
        deleteProduct(id: Int) : [Product]
    }

`);

let products = [];
let counter = 1;
const root = {
  // metodos
  getProducts: () => {
    return products;
  },
  getProductById: (data) => {
    for (let i = 0; i < products.length; i++)
      if (products[i].id == data.id) return products[i];

    return null;
  },
  addProduct: (data) => {
    let temp = { id: counter, name: data.name, stock: data.stock };
    products.push(temp);
    counter++;
    return temp;
  },
  modifyProduct: (data) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == data.id) {
        let newProduct = {
          id: products[i].id,
          name: data.name,
          stock: data.stock,
        };
        Object.assign(products[i], newProduct);
        return products[i];
      }
    }
  },
  deleteProduct: (data) => {
    let newProducts = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].id !== data.id) {
        newProducts.push(products[i]);
      }
    }
    if (newProducts.length !== products.length) {
      Object.assign(products, newProducts);
    }
    return products;
  },
};

app.use(
  "/home",
  graphqlHTTP({
    schema,
    rootValue: root,
  })
);
