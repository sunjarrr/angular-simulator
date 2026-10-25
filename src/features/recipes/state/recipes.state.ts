import { IRecipe } from "../models/IRecipe";

export interface IRecipeState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}

export const initialRecipeState: IRecipeState = {
  recipes: [],
  loading: false,
  error: null,
}