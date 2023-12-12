import { SetResponse } from "@project/meta";
import { HydratedDocument } from "mongoose";

import { Set } from "../scheme";
import { WithMongooseId } from "../utils";
import { ProductMapper } from "./ProductMapper";

export interface SetWithPrice extends Set {
  price: number;
}

interface SetMapperInterface {
  setToDto: (set: WithMongooseId<SetWithPrice>) => SetResponse;
  setToSetWithPrice: (set: WithMongooseId<Set>) => WithMongooseId<SetWithPrice>;
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
  setToSetWithPrice: (set: WithMongooseId<Set>) => ({
    _id: set._id,
    description: set.description,
    name: set.name,
    price: set.products.reduce((acc, product) => {
      acc += product.price;
      return acc;
    }, 0),
    products: set.products,
  }),
};
