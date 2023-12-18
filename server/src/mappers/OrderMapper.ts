import { OrderResponse } from '@project/meta';

import { Order } from '../scheme';
import { WithMongooseId } from '../utils';
import { SetMapper } from './SetMapper';

interface OrderMapperInterface {
  orderToDto: (order: WithMongooseId<Order>) => OrderResponse;
}

export const OrderMapper: OrderMapperInterface = {
  orderToDto: (order) => ({
    address: order.address,
    arrival_date: order.arrival_date,

    creation_date: order.creation_date,

    id: order._id.toString(),

    set_count: order.set_count,

    sets: order.sets.map((set) => {
      return SetMapper.setToDto(SetMapper.setToSetWithPrice(set));
    }),
  }),
};
