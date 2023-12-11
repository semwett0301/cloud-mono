import { ProductResponseDto } from "../dto";

export interface ProductServiceInterface {
  getProducts(): Promise<ProductResponseDto[]>;
  getProductById(id: string): Promise<ProductResponseDto>;
}
