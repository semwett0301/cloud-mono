import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { WithMongooseId } from "../utils";
import { Product } from "./product.schema";

export type SetDocument = HydratedDocument<Set>;

@Schema()
export class Set {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ ref: "Product", type: mongoose.Schema.Types.ObjectId }] })
  products: WithMongooseId<Product>[];
}

export const SetSchema = SchemaFactory.createForClass(Set);
