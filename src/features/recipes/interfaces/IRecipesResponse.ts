import { IRecipe } from "./IRecipe";

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}