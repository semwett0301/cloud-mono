import { SetResponse } from "./SetResponse";

export interface OrderResponse {
  address: string;

  creation_date: Date;

  arrival_date: Date;

  set_count: number;

  sets: SetResponse[];
}
