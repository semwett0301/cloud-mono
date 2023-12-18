import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductRequest, ProductResponse } from '@project/meta';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductResponse[]> {
    return await this.productsService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id): Promise<ProductResponse> {
    return await this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() productRequest: ProductRequest) {}

  @Post('/get-products-by-set/:set-id')
  async getProductsBySet(@Param('set-id') setId): Promise<ProductResponse[]> {
    return await this.productsService.getProductsBySet(setId);
  }
}
