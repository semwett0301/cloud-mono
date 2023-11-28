import { ProductResponse } from "./ProductResponse";

export interface SetResponse {
  id: string;

  name: string;

  description: string;

  products: ProductResponse[];
}
