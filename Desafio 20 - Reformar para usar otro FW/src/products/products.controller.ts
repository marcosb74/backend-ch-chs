import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDao } from 'src/dto/create-product-dto';
import { Product } from 'src/interface/product.interface';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  addProduct(@Body() CreateProductDao: CreateProductDao) {
    this.productService.addProduct(CreateProductDao);
    return {
      Operation: 'Save',
      Message: 'Success',
      Item: CreateProductDao,
    };
  }

  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts();
  }
  @Get(':name')
  getProductByName(@Param('name') name: any): Product {
    console.log(name);
    return this.productService.getProductByName(name);
  }
  @Put(':name')
  modifyProduct(
    @Param('name') name: any,
    @Body() CreateProductDao: CreateProductDao,
  ): Product {
    return this.productService.modifyProduct(name, CreateProductDao);
  }

  @Delete(':name')
  deleteProduct(@Param('name') name: any): Product[] {
    return this.productService.deleteProduct(name);
  }
}
