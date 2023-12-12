import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtAuthGuard } from "../guards";
import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  exports: [AuthService, JwtModule, UsersModule],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY ?? "SECRET",
      signOptions: {
        expiresIn: "10d",
      },
    }),
  ],
  providers: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
