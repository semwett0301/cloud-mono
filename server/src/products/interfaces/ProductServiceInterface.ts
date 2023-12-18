import { ProductRequest, ProductResponse, ProductStatus } from "@project/meta";

export interface ProductServiceInterface {
  getProducts(): Promise<ProductResponse[]>;

  getProductById(id: string): Promise<ProductResponse>;

  createProduct(product: ProductRequest): Promise<ProductResponse>;

  changeStatus(
    productId: string,
    status: ProductStatus
  ): Promise<ProductResponse>;

  getProductsBySet(setId: string): Promise<ProductResponse[]>;
}
