import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { ProductMapper } from "../mappers";
import { Product } from "../scheme";
import { ProductResponseDto } from "./dto";
import { ProductServiceInterface } from "./interfaces/ProductServiceInterface";

@Injectable()
export class ProductsService implements ProductServiceInterface {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async getProductById(id: string): Promise<ProductResponseDto> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await this.productModel.findById(id).exec();

      return ProductMapper.productToDto(product);
    }

    throw new HttpException("Incorrect id", HttpStatus.BAD_REQUEST);
  }

  async getProducts(): Promise<ProductResponseDto[]> {
    const sets = await this.productModel.find().exec();

    return sets.map((set) => ProductMapper.productToDto(set));
  }
}
