import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Role } from '../types/Role';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    isRequired: true,
    unique: true,
  })
  username: string;

  @Prop({
    isRequired: true,
  })
  password: string;

  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
  })
  surname: string;

  @Prop({
    isRequired: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
