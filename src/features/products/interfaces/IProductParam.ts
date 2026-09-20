import { SortDirection } from "../../../enums/SortDirections";

export interface IProductParam {
  skip: number;
  limit: number;
  search: string;
  category: string | null;
  field: string;
  order: SortDirection;
}