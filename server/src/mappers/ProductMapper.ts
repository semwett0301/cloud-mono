import { ProductResponse } from "@project/meta";

import { Product } from "../scheme";
import { WithMongooseId } from "../utils";

interface SetMapperInterface {
  productToDto: (product: WithMongooseId<Product>) => ProductResponse;
}

export const ProductMapper: SetMapperInterface = {
  productToDto: (product: WithMongooseId<Product>) => ({
    description: product.description,
    id: product._id.toString(),
    name: product.name,
    photos: product.photos,
  }),
};
