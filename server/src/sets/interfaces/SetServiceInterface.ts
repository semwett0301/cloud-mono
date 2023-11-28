import { SetResponseDto } from "../dto";

export interface SetServiceInterface {
  getSets(): Promise<SetResponseDto[]>;
  getSetById(id: string): Promise<SetResponseDto>;
}
