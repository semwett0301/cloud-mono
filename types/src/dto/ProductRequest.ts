import { ProductStatus } from "../model";

export interface ProductRequest {
  name: string;

  description: string;

  photos: string[];

  price: number;

  status: ProductStatus;
}
