import { Controller, Get, Param } from "@nestjs/common";

import { ProductResponseDto } from "./dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getSets(): Promise<ProductResponseDto[]> {
    return await this.productsService.getProducts();
  }

  @Get("/:id")
  async getSet(@Param("id") id): Promise<ProductResponseDto> {
    return await this.productsService.getProductById(id);
  }
}
