import { ProductResponse } from "@project/meta";

export interface ProductServiceInterface {
  getProducts(): Promise<ProductResponse[]>;
  getProductById(id: string): Promise<ProductResponse>;
  getProductsBySet(setId: string): Promise<ProductResponse[]>;
}
