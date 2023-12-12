import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import process from "process";

import { AuthModule } from "./auth";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products";
import { SetsModule } from "./sets";
import { UsersModule } from "./users";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(process.env.MONGODB_ROOT),
    SetsModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
