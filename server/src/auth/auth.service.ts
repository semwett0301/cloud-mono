import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthLogin, AuthRegister, AuthResponse } from "@project/meta";
import * as bcrypt from "bcryptjs";

import { User } from "../scheme";
import { UserJwt } from "../types";
import { UsersService } from "../users";
import { WithMongooseId } from "../utils";
import { AuthServiceInterface } from "./interfaces";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: AuthLogin) {
    const candidate = await this.validateUser(loginDto);

    return this.generateToken(candidate);
  }

  async register(registerDto: AuthRegister) {
    const candidate = await this.findUserByUsername(registerDto.username);

    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword: string = await bcrypt.hash(
      registerDto.password,
      process.env.SALT ?? 5
    );

    const newUser = await this.userService.createUser({
      ...registerDto,
      password: hashPassword,
    });

    return this.generateToken(newUser);
  }

  private async generateToken(
    user: WithMongooseId<User>
  ): Promise<AuthResponse> {
    const payload: UserJwt = {
      id: user._id.toString(),
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async findUserByUsername(
    username: string
  ): Promise<WithMongooseId<User>> {
    return await this.userService.getUserByUsername(username);
  }

  private async validateUser(
    authLogin: AuthLogin
  ): Promise<WithMongooseId<User>> {
    const user = await this.findUserByUsername(authLogin.username);
    const passwordEquals = await bcrypt.compare(
      authLogin.password,
      user?.password
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException("Некорректный username или пароль");
  }
}
