export interface ICartRequest {
  userId?: number
  products: {
    id: number;
    quantity: number;
  }[];
}