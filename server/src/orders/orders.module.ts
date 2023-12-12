import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "../auth";
import { Order, OrderSchema, SetSchema } from "../scheme";
import { UsersModule } from "../users";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
  controllers: [OrdersController],
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Set.name,
        schema: SetSchema,
      },
    ]),
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
