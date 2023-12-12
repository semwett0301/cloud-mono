import { SetResponse } from "./SetResponse";

export interface OrderResponse {
  id: string;

  address: string;

  creation_date: Date;

  arrival_date: Date;

  set_count: number;

  sets: SetResponse[];
}
