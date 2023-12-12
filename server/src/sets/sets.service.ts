import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { SetMapper, SetWithPrice } from "../mappers";
import { Set } from "../scheme";
import { SetResponseDto, SetSortItem, SetsRequestDto } from "./dto";
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

  async getSets(
    params: SetsRequestDto = {
      page: 0,
      pageSize: 10,
    }
  ): Promise<SetResponseDto[]> {
    const sets: Set[] = await this.setModel.find().exec();

    const resultSets = this.paginate(
      this.sort(
        this.filterByPrice(sets, params.lePrice, params.gePrice),
        params.sort
      ),
      params.page,
      params.pageSize
    );

    return resultSets.map((set) => SetMapper.setToDto(set));
  }

  paginate(sets: SetWithPrice[], page = 0, pageSize = 10) {
    return sets.reduce((acc, set, idx) => {
      if (idx > page * pageSize && idx < (page + 1) * pageSize) {
        acc.push(set);
      }

      return acc;
    }, []);
  }

  sort(sets: SetWithPrice[], sort?: SetSortItem) {
    if (sort) {
      const sign = sort[0];
      const value = sort.slice(1, sort.length);

      if (sign === "+") {
        return sets.sort((set1, set2) => set1[value] - set2[value]);
      }
      if (sign === "-") {
        return sets.sort((set1, set2) => set2[value] - set1[value]);
      }
    }

    return sets;
  }

  filterByPrice(
    sets: Set[],
    lePrice?: number,
    gePrice?: number
  ): SetWithPrice[] {
    const newSets = sets.map((set) => ({
      ...set,
      price: set.products.reduce((acc, product) => {
        acc += product.price;
        return acc;
      }, 0),
    }));

    if (lePrice && gePrice) {
      return newSets.filter(
        (newSet) => newSet.price >= gePrice && newSet.price <= lePrice
      );
    }

    if (lePrice) {
      return newSets.filter((newSet) => newSet.price <= lePrice);
    }

    if (gePrice) {
      return newSets.filter((newSet) => newSet.price <= lePrice);
    }

    return newSets;
  }
}
