import { IQuote } from "./IQuote";

export interface IQuoteResponse {
  quotes: IQuote[];
  total: number;
  skip: number;
  limit: number;
}