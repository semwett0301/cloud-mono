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

    throw new HttpException("Incorrect id", HttpStatus.BAD_REQUEST);
  }

  getUsers() {
    return this.userModel.find().exec();
  }

  getUserByUsername(username: string): Promise<WithMongooseId<User>> {
    return this.userModel.findOne({ username });
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    newUser.save();
    return newUser;
  }
}
