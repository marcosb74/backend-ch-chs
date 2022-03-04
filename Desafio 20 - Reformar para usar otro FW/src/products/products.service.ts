import { Injectable } from '@nestjs/common';
import { Product } from 'src/interface/product.interface';
import { requestBody } from 'src/interface/requestBody.interface';
@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];
  addProduct(product: Product) {
    this.products.push(product);
  }

  getProducts(): Product[] {
    return this.products;
  }
  getProductByName(name: string): Product {
    //Will only get the 1st appereance, it's intended. Also, case sensitive
    for (let i = 0; i < this.products.length; i++)
      if (this.products[i].name == name) return this.products[i];
    return null;
  }
  modifyProduct(name: string, data: requestBody): Product {
    //works as intended
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name == name) {
        let newProduct = {
          name: data.name,
          stock: data.stock,
        };
        Object.assign(this.products[i], newProduct);
        return this.products[i];
      }
    }
  }
  deleteProduct(name: string): Product[] {
    //works as intended
    let newProducts = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name !== name) {
        newProducts.push(this.products[i]);
      }
    }
    if (newProducts.length !== this.products.length) {
      Object.assign(this.products, newProducts);
    }
    return this.products;
  }
}
