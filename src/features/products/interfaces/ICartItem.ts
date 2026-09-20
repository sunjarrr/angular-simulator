import { IProduct } from "./IProduct";

export interface ICartItem extends Pick<IProduct, 'id' | 'title' | 'price' | 'thumbnail' | 'discountPercentage'> {
  quantity: number;
  total: number;
  discountedTotal: number;
}