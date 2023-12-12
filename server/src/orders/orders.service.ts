import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderCreateRequest } from "@project/meta";
import { Model } from "mongoose";

import { OrderMapper } from "../mappers";
import { Order, Set } from "../scheme";
import { UsersService } from "../users";
import { WithMongooseId } from "../utils";
import { OrdersServiceInterface } from "./interfaces/OrdersServiceInterface";

@Injectable()
export class OrdersService implements OrdersServiceInterface {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Set.name) private setModel: Model<Set>,
    private usersService: UsersService
  ) {}

  async cancelOrder(orderId: string): Promise<void> {
    const order = await this.findOrderById(orderId);
    order.deleteOne();
  }

  async getMyOrder(orderId: string) {
    const order = await this.findOrderById(orderId);
    return OrderMapper.orderToDto(order);
  }

  async getMyOrders(userId: string) {
    const orders = await this.orderModel
      .find()
      .populate({
        path: "sets",
        populate: {
          path: "products",
        },
      })
      .exec();

    return this.filterMyOrders(orders, userId).map((order) =>
      OrderMapper.orderToDto(order)
    );
  }

  async changeOrder(
    orderId: string,
    newOrderPart: Partial<Omit<OrderCreateRequest, "set_ids">>
  ) {
    const order = await this.orderModel
      .findByIdAndUpdate(orderId, newOrderPart)
      .populate({
        path: "sets",
        populate: {
          path: "products",
        },
      });

    return OrderMapper.orderToDto(order);
  }

  async createOrder(userId: string, newOrderPart: OrderCreateRequest) {
    const order = await this.orderModel.create({
      ...newOrderPart,
      creation_date: new Date(),
      set_count: newOrderPart.set_ids.length,
      sets: await this.setModel.find({ _id: { $in: newOrderPart.set_ids } }),
      user: await this.usersService.getUserById(userId),
    });

    return OrderMapper.orderToDto(
      await order.populate({
        path: "sets",
        populate: {
          path: "products",
        },
      })
    );
  }

  private filterMyOrders(orders: WithMongooseId<Order>[], id: string) {
    return orders.filter((order) => order.user._id.toString() === id);
  }

  private async findOrderById(orderId: string) {
    const order = await this.orderModel
      .findById(orderId)
      .populate({
        path: "sets",
        populate: {
          path: "products",
        },
      })
      .exec();

    if (!order) {
      throw new NotFoundException("Заказ не был найден");
    }

    return order;
  }
}
