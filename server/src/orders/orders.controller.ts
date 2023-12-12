import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { OrderCreateRequest } from "@project/meta";

import { JwtAuthGuard, OrderOwnerGuard } from "../guards";
import { OrdersService } from "./orders.service";

@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(@Req() req) {
    return this.ordersService.getMyOrders(req.user.id);
  }

  @UseGuards(OrderOwnerGuard)
  @Get("/:id")
  getOrderById(@Param("id") orderId) {
    return this.ordersService.getMyOrder(orderId);
  }

  @Post()
  createNewOrder(@Req() req, @Body() orderCreateReq: OrderCreateRequest) {
    return this.ordersService.createOrder(req.user.id, orderCreateReq);
  }

  @UseGuards(OrderOwnerGuard)
  @Patch("/:id")
  changeOrder(
    @Req() req,
    @Param("id") orderId,
    @Body() orderChangeReq: Partial<Omit<OrderCreateRequest, "set_ids">>
  ) {
    return this.ordersService.changeOrder(orderId, orderChangeReq);
  }

  @UseGuards(OrderOwnerGuard)
  @Delete("/:id")
  cancelOrder(@Param("id") orderId) {
    return this.ordersService.cancelOrder(orderId);
  }
}
