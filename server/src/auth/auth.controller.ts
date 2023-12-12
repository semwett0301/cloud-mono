import { Body, Controller, Post } from "@nestjs/common";
import { AuthLogin, AuthRegister } from "@project/meta";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() loginDto: AuthLogin) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  register(@Body() registerDto: AuthRegister) {
    return this.authService.register(registerDto);
  }
}
