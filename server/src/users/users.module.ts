import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Set, SetSchema, User, UserSchema } from "../scheme";
import { UsersService } from "./users.service";

@Module({
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
