import { Role } from './Role';

export interface UserJwt {
  id: string;
  username: string;
  role: Role;
}
