import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRecipeState } from "../interfaces/IRecipeState";

export const selectorRecipes = createFeatureSelector<IRecipeState>('recipes')

export const selectAllRecipes = createSelector(
  selectorRecipes,
  (state) => state.recipes
);

export const selectRecipesLoading = createSelector(
  selectorRecipes,
  (state) => state.loading
);

export const selectRecipesError = createSelector(
  selectorRecipes,
  (state) => state.error
)