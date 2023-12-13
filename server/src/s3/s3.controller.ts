import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductStatus } from "@project/meta";
import { Model } from "mongoose";

import { Product } from "../scheme";
import { S3Service } from "./s3.service";

@Controller("static")
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  @Get("/:id")
  async serveStaticFile(@Param("id") id, @Res() response) {
    try {
      if (this.validateFile(id)) {
        throw new ForbiddenException("Доступ запрещен");
      }

      const s3Object = await this.s3Service.getObject(id);

      response.header("Content-Type", s3Object.ContentType);
      response.send(s3Object.Body);
    } catch (e) {
      throw new NotFoundException("Файл не найден");
    }
  }

  private async validateFile(fileId: string) {
    const products = await this.productModel
      .find({ status: ProductStatus.DISABLED })
      .exec();

    return !!products.find((product) => product.photos.includes(fileId));
  }
}
