import { ProductResponse, SetResponse } from "@project/meta";

export class SetResponseDto implements SetResponse {
  id: string;

  description: string;

  name: string;

  products: ProductResponse[];
}
