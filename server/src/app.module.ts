import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import process from "process";

import { SetsModule } from "./sets";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(process.env.MONGODB_ROOT),
    SetsModule,
  ],
})
export class AppModule {}
