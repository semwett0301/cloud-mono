import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "../auth";
import { Product, ProductSchema, Set, SetSchema } from "../scheme";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Set.name,
        schema: SetSchema,
      },
    ]),
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
