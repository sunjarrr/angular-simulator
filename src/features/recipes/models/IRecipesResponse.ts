import { IRecipe } from "../models/IRecipe";

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}