import {
  AuthLogin,
  AuthRegister,
  AuthResponse,
  UserResponse,
} from "@project/meta";

export interface AuthServiceInterface {
  login(loginDto: AuthLogin): Promise<AuthResponse>;

  register(registerDto: AuthRegister): Promise<AuthResponse>;

  getMe(username: string): Promise<UserResponse>;
}
