export interface PagedResult<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  sizeOfPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
