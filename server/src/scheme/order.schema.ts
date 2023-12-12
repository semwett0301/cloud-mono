import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { WithMongooseId } from "../utils";
import { Set } from "./set.schema";
import { User } from "./user.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  address: string;

  @Prop()
  creation_date: Date;

  @Prop()
  arrival_date: Date;

  @Prop()
  set_count: number;

  @Prop({ ref: "User", type: mongoose.Schema.Types.ObjectId })
  user: WithMongooseId<User>;

  @Prop({ type: [{ ref: "Set", type: mongoose.Schema.Types.ObjectId }] })
  sets: WithMongooseId<Set>[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
