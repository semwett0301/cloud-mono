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
} from '@nestjs/common';
import { OrderCreateRequest, ReturnOrder } from "@project/meta";

import { JwtAuthGuard, OrderOwnerGuard } from '../guards';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders(@Req() req) {
    return this.ordersService.getMyOrders(req.user.id);
  }

  @UseGuards(OrderOwnerGuard)
  @Get('/:id')
  async getOrderById(@Param('id') orderId) {
    return this.ordersService.getMyOrder(orderId);
  }

  @Post()
  async createNewOrder(@Req() req, @Body() orderCreateReq: OrderCreateRequest) {
    return this.ordersService.createOrder(req.user.id, orderCreateReq);
  }

  @UseGuards(OrderOwnerGuard)
  @Patch('/:id')
  async changeOrder(
    @Req() req,
    @Param('id') orderId,
    @Body() orderChangeReq: Partial<Omit<OrderCreateRequest, 'set_ids'>>,
  ) {
    return this.ordersService.changeOrder(orderId, orderChangeReq);
  }

  @UseGuards(OrderOwnerGuard)
  @Delete('/:id')
  async cancelOrder(@Param('id') orderId) {
    return this.ordersService.cancelOrder(orderId);
  }

  @UseGuards(OrderOwnerGuard)
  @Post("/:id/return")
  async returnOrder(@Param('id') orderId, @Body() returnBody: ReturnOrder) {
    return this.ordersService.returnOrder(orderId, returnBody.type);
  }
}
