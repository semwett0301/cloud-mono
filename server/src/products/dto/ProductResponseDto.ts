import { ProductStatus } from "@project/meta";

import { Set } from "../../scheme";

export interface ProductResponseDto {
  id: string;

  name: string;

  description: string;

  photos: string[];

  status: ProductStatus;

  sets: Set[];
}
