import { IRecipe } from "./IRecipe";

export interface IRecipeState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}