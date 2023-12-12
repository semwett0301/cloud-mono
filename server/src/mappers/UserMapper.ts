import { UserResponse } from "@project/meta";

import { User } from "../scheme";
import { WithMongooseId } from "../utils";

interface UserMapperInterface {
  userToDto: (set: WithMongooseId<User>) => UserResponse;
}

export const UserMapper: UserMapperInterface = {
  userToDto: (user: WithMongooseId<User>) => ({
    id: user._id.toString(),
    name: user.name,
    surname: user.surname,
  }),
};
