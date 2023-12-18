import { User } from '../../scheme';
import { WithMongooseId } from '../../utils';
import { CreateUserDto } from '../dto';

export interface UserServiceInterface {
  getUsers(): Promise<WithMongooseId<User>[]>;

  getUserById(id: string): Promise<WithMongooseId<User>>;

  getUserByUsername(username: string): Promise<WithMongooseId<User>>;

  createUser(createUserDto: CreateUserDto): Promise<WithMongooseId<User>>;
}
