import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY ?? "SECRET",
      signOptions: {
        expiresIn: "10d",
      },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
