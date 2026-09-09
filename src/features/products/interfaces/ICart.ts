import { ICartItem } from "./ICartItem";

export interface ICart {
  id: number;
  product: ICartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}