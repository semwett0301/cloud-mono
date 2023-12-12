import { ProductResponse } from "./ProductResponse";

export interface SetResponse {
  id: string;

  name: string;

  description: string;

  price: number;

  products: ProductResponse[];
}
