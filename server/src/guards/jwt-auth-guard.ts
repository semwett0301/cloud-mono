import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserJwt } from '../types';
import { UsersService } from '../users';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        this.throwError();
      }

      const userJwt: UserJwt = this.jwtService.verify(token);
      const user = this.usersService.getUserByUsername(userJwt.username);

      if (!user) {
        this.throwError();
      }

      req.user = userJwt;
      return true;
    } catch (e) {
      this.throwError();
    }
  }

  private throwError() {
    throw new UnauthorizedException('Пользователь не авторизован');
  }
}
