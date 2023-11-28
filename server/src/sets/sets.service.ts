import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { SetMapper } from "../mappers";
import { Set } from "../scheme";
import { SetResponseDto } from "./dto";
import { SetServiceInterface } from "./interfaces";

@Injectable()
export class SetsService implements SetServiceInterface {
  constructor(@InjectModel(Set.name) private setModel: Model<Set>) {}

  async getSetById(id: string): Promise<SetResponseDto> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const set = await this.setModel.findById(id).exec();

      return SetMapper.setToDto(set);
    }

    throw new HttpException("Incorrect id", HttpStatus.BAD_REQUEST);
  }

  async getSets(): Promise<SetResponseDto[]> {
    const sets = await this.setModel.find().exec();

    return sets.map((set) => SetMapper.setToDto(set));
  }
}
