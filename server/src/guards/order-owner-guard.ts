import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { Order } from '../scheme';

@Injectable()
export class OrderOwnerGuard implements CanActivate {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const { id } = req.params;

      if (!id) return true;

      return this.orderModel
        .findById(id)
        .populate('user')
        .then((order) => !order || order.user._id.toString() === req.user.id);
    } catch (e) {
      this.throwError();
    }
  }

  private throwError() {
    throw new ForbiddenException('Доступ запрещен');
  }
}
