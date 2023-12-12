import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "../auth";
import { Set, SetSchema } from "../scheme";
import { SetsController } from "./sets.controller";
import { SetsService } from "./sets.service";

@Module({
  controllers: [SetsController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Set.name,
        schema: SetSchema,
      },
    ]),
  ],
  providers: [SetsService],
})
export class SetsModule {}
