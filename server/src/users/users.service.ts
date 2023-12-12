import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { User } from "../scheme";
import { WithMongooseId } from "../utils";
import { CreateUserDto } from "./dto";
import { UserServiceInterface } from "./interfaces";

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUserById(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.userModel.findById(id).exec();
    }

    throw new HttpException("Нет такого пользователя", HttpStatus.NOT_FOUND);
  }

  getUsers() {
    return this.userModel.find().exec();
  }

  async getUserByUsername(username: string): Promise<WithMongooseId<User>> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException("Incorrect username", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    newUser.save();
    return newUser;
  }
}
