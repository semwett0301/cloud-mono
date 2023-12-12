export type SetSortItem = "+price" | "-price";

export interface SetsRequestDto {
  sort?: SetSortItem;
  page?: number;
  pageSize?: number;
  lePrice?: number;
  gePrice?: number;
}
