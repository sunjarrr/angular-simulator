import { SortDirection } from "../../../enums/SortDirections";

export interface IProductParams {
  skip: number;
  limit: number;
  search: string;
  category: string | null;
  field: string;
  order: SortDirection;
}