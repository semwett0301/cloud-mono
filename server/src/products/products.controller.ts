import { Controller, Get, Param, Post } from "@nestjs/common";

import { ProductResponseDto } from "./dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductResponseDto[]> {
    return await this.productsService.getProducts();
  }

  @Get("/:id")
  async getProduct(@Param("id") id): Promise<ProductResponseDto> {
    return await this.productsService.getProductById(id);
  }

  @Post("/get-products-by-set/:set-id")
  async getProductsBySet(
    @Param("set-id") setId
  ): Promise<ProductResponseDto[]> {
    return await this.productsService.getProductsBySet(setId);
  }
}
