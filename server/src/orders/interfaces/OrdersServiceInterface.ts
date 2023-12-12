import { OrderCreateRequest, OrderResponse } from "@project/meta";

export interface OrdersServiceInterface {
  getMyOrders(userId: string): Promise<OrderResponse[]>;

  getMyOrder(orderId: string): Promise<OrderResponse>;

  createOrder(
    userId: string,
    newOrderPart: OrderCreateRequest
  ): Promise<OrderResponse>;

  cancelOrder(orderId: string): Promise<void>;

  changeOrder(
    orderId: string,
    newOrderPart: Partial<Omit<OrderCreateRequest, "set_ids">>
  ): Promise<OrderResponse>;
}
