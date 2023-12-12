import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { ProductMapper } from "../mappers";
import { Product, Set } from "../scheme";
import { ProductResponseDto } from "./dto";
import { ProductServiceInterface } from "./interfaces/ProductServiceInterface";

@Injectable()
export class ProductsService implements ProductServiceInterface {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Set.name) private setModel: Model<Set>
  ) {}

  async getProductById(id: string): Promise<ProductResponseDto> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await this.productModel.findById(id).exec();

      return ProductMapper.productToDto(product);
    }

    throw new HttpException("Incorrect id", HttpStatus.BAD_REQUEST);
  }

  async getProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productModel.find().exec();

    return products.map((product) => ProductMapper.productToDto(product));
  }

  async getProductsBySet(setId: string): Promise<ProductResponseDto[]> {
    const sets: Set[] = await this.setModel.find().exec();

    return sets
      .find((set) => set.id === setId)
      .products.map((product) => ProductMapper.productToDto(product));
  }
}
