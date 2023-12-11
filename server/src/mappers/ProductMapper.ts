import { ProductResponseDto } from "../products";
import { Product } from "../scheme";

interface SetMapperInterface {
  productToDto: (set: Product) => ProductResponseDto;
}

export const ProductMapper: SetMapperInterface = {
  productToDto: (set: Product) => ({
    ...set,
  }),
};
