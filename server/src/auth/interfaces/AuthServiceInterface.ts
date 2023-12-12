import { AuthLogin, AuthRegister, AuthResponse } from "@project/meta";

export interface AuthServiceInterface {
  login(loginDto: AuthLogin): Promise<AuthResponse>;

  register(registerDto: AuthRegister): Promise<AuthResponse>;
}
