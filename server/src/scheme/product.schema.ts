import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductStatus } from "@project/meta";
import mongoose, { HydratedDocument } from "mongoose";

import { Set } from "./set.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    isRequired: true,
    unique: true,
  })
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop([String])
  photos: string[];

  @Prop
  price: number;

  @Prop(ProductStatus)
  status: ProductStatus;

  @Prop({ type: [{ ref: "Set", type: mongoose.Schema.Types.ObjectId }] })
  sets: Set[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
