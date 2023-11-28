import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { Product } from "./product.schema";

export type SetDocument = HydratedDocument<Set>;

@Schema()
export class Set {
  @Prop({
    isRequired: true,
    unique: true,
  })
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ ref: "Product", type: mongoose.Schema.Types.ObjectId }] })
  products: Product[];
}

export const SetSchema = SchemaFactory.createForClass(Set);
