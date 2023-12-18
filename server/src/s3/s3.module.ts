import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from '../scheme';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  controllers: [S3Controller],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [S3Service],
})
export class S3Module {}
