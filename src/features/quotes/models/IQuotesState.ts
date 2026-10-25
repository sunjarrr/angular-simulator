import { IQuote } from "./IQuote";

export interface IQoutesState {
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean;
  error: string | null;
  filterStatus: 'all' | 'favorites';
  selectedQuote: IQuote | null;
}