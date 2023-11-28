import { Set } from "../scheme";
import { SetResponseDto } from "../sets";

interface SetMapperInterface {
  setToDto: (set: Set) => SetResponseDto;
}

export const SetMapper: SetMapperInterface = {
  setToDto: (set: Set) => ({
    ...set,
  }),
};
