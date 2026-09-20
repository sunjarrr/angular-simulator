import { IProduct } from "./IProduct";

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}