import { AuthLogin } from "./AuthLogin";

export interface AuthRegister extends AuthLogin {
  name: string;

  surname: string;
}
