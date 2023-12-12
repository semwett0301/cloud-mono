export type SetSortItem = "+price" | "-price";

export interface SetRequest {
  sort?: SetSortItem;
  page?: number;
  pageSize?: number;
  lePrice?: number;
  gePrice?: number;
}
