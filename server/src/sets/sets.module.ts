import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Set, SetSchema } from "../scheme";
import { SetsController } from "./sets.controller";
import { SetsService } from "./sets.service";

@Module({
  controllers: [SetsController],
  imports: [
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
