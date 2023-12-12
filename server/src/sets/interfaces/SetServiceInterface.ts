import { SetResponseDto, SetsRequestDto } from "../dto";

export interface SetServiceInterface {
  getSets(params: SetsRequestDto): Promise<SetResponseDto[]>;
  getSetById(id: string): Promise<SetResponseDto>;
}
