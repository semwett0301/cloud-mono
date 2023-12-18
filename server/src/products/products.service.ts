import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductRequest, ProductResponse, ProductStatus } from "@project/meta";
import mongoose, { Model } from "mongoose";

import { AdminGuard } from "../guards";
import { ProductMapper } from "../mappers";
import { Product, Set } from "../scheme";
import { WithMongooseId } from "../utils";
import { ProductServiceInterface } from "./interfaces/ProductServiceInterface";

@Injectable()
export class ProductsService implements ProductServiceInterface {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Set.name) private setModel: Model<Set>
  ) {}

  @UseGuards(AdminGuard)
  async createProduct(product: ProductRequest) {
    const newProduct: WithMongooseId<Product> = await this.productModel.create(
      product
    );

    return ProductMapper.productToDto(newProduct);
  }

  @UseGuards(AdminGuard)
  async changeStatus(productId: string, status: ProductStatus) {
    const product = await this.productModel.findById(productId).exec();

    product.status = status;
    product.save();

    return ProductMapper.productToDto(product);
  }

  async getProductById(id: string): Promise<ProductResponse> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await this.productModel.findById(id).exec();

      return ProductMapper.productToDto(product);
    }

    throw new HttpException("Продукт не был найден", HttpStatus.NOT_FOUND);
  }

  async getProducts(): Promise<ProductResponse[]> {
    const products = await this.productModel
      .find({ status: ProductStatus.ACTIVE })
      .exec();

    return products.map((product) => ProductMapper.productToDto(product));
  }

  async getProductsBySet(setId: string): Promise<ProductResponse[]> {
    const sets: WithMongooseId<Set>[] = await this.setModel.find().exec();

    return sets
      .find((set) => set._id.toString() === setId)
      .products.map((product) => ProductMapper.productToDto(product));
  }
}
