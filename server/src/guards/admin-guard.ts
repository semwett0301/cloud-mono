import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Role, UserJwt } from '../types';

export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      const token = authHeader.split(' ')[1];

      const userJwt: UserJwt = this.jwtService.verify(token);

      if (userJwt?.role !== Role.ADMIN) {
        this.throwError();
      }
      return true;
    } catch (e) {
      this.throwError();
    }
  }

  private throwError() {
    throw new ForbiddenException('Нет доступа');
  }
}
