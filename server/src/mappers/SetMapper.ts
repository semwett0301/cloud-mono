import { SetResponse } from "@project/meta";

import { Set } from "../scheme";
import { WithMongooseId } from "../utils";
import { ProductMapper } from "./ProductMapper";

export interface SetWithPrice extends Set {
  price: number;
}

interface SetMapperInterface {
  setToDto: (set: WithMongooseId<SetWithPrice>) => SetResponse;
}

export const SetMapper: SetMapperInterface = {
  setToDto: (set: WithMongooseId<SetWithPrice>) => ({
    description: set.description,
    id: set._id.toString(),
    name: set.name,
    price: set.price,
    products: set.products.map((product) =>
      ProductMapper.productToDto(product)
    ),
  }),
};
