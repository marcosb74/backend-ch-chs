Route to check all GraphQL endpoints: localhost:4000/home

Verbs to test:

GET
query{
    getProducts{
        name,
        id,
        stock
    }
}
query{
    getProductById(id: 1){
        name,
        id,
        stock
    }
}

---

POST
mutation{
    addProduct(name:"Regla", stock:10){
        name
    }
}



mutation{
    modifyProduct(id: 1, name:"Escuadra", stock: 32){
        name,
        id,
        stock
    }
}

mutation{
    deleteProduct(id:1){
        name,
        id,
        stock
    }
}
