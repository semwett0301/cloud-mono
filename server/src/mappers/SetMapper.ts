import { Set } from "../scheme";
import { SetResponseDto } from "../sets";

export interface SetWithPrice extends Set {
  price: number;
}

interface SetMapperInterface {
  setToDto: (set: SetWithPrice) => SetResponseDto;
}

export const SetMapper: SetMapperInterface = {
  setToDto: (set: SetWithPrice) => ({
    ...set,
  }),
};
