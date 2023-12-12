import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductResponse } from "@project/meta";

import { JwtAuthGuard } from "../guards";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductResponse[]> {
    return await this.productsService.getProducts();
  }

  @Get("/:id")
  async getProduct(@Param("id") id): Promise<ProductResponse> {
    return await this.productsService.getProductById(id);
  }

  @Post("/get-products-by-set/:set-id")
  async getProductsBySet(@Param("set-id") setId): Promise<ProductResponse[]> {
    return await this.productsService.getProductsBySet(setId);
  }
}
