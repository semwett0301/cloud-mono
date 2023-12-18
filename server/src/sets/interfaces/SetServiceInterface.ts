import { SetRequest, SetResponse } from '@project/meta';

export interface SetServiceInterface {
  getSets(params: SetRequest): Promise<SetResponse[]>;

  getSetById(id: string): Promise<SetResponse>;
}
