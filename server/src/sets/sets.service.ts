import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductStatus,
  SetRequest,
  SetResponse,
  SetSortItem,
} from '@project/meta';
import mongoose, { Model } from 'mongoose';

import { SetMapper, SetWithPrice } from '../mappers';
import { Set } from '../scheme';
import { WithMongooseId } from '../utils';
import { SetServiceInterface } from './interfaces';

@Injectable()
export class SetsService implements SetServiceInterface {
  constructor(@InjectModel(Set.name) private setModel: Model<Set>) {}

  async getSetById(id: string): Promise<SetResponse> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const set = await this.setModel.findById(id).populate('products').exec();

      return SetMapper.setToDto(SetMapper.setToSetWithPrice(set));
    }

    throw new HttpException('Набор не был найден', HttpStatus.NOT_FOUND);
  }

  async getSets(
    params: SetRequest = {
      page: 0,
      pageSize: 10,
    },
  ): Promise<SetResponse[]> {
    const sets = await this.setModel.find().populate('products').exec();

    const resultSets = this.paginate(
      this.sort(
        this.filterByPrice(
          this.filterByProductsStatus(sets),
          params.lePrice,
          params.gePrice,
        ),
        params.sort,
      ),
      params.page,
      params.pageSize,
    );

    return resultSets.map((set) => SetMapper.setToDto(set));
  }

  private paginate(sets: SetWithPrice[], page = 0, pageSize = 10) {
    return sets.reduce((acc, set, idx) => {
      if (idx >= page * pageSize && idx < (page + 1) * pageSize) {
        acc.push(set);
      }

      return acc;
    }, []);
  }

  private sort(sets: SetWithPrice[], sort?: SetSortItem) {
    if (sort) {
      const sign = sort[0];
      const value = sort.slice(1, sort.length);

      if (sign === '+') {
        return sets.sort((set1, set2) => set1[value] - set2[value]);
      }
      if (sign === '-') {
        return sets.sort((set1, set2) => set2[value] - set1[value]);
      }
    }

    return sets;
  }

  private filterByPrice(
    sets: WithMongooseId<Set>[],
    lePrice?: number,
    gePrice?: number,
  ): SetWithPrice[] {
    const newSets = sets.map((set) => SetMapper.setToSetWithPrice(set));

    if (lePrice && gePrice) {
      return newSets.filter(
        (newSet) => newSet.price >= gePrice && newSet.price <= lePrice,
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

  private filterByProductsStatus(sets: WithMongooseId<Set>[]) {
    return sets.filter(
      (set) =>
        !set.products.find(
          (product) => product.status === ProductStatus.DISABLED,
        ),
    );
  }
}
