import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { IRecipeState } from "./recipes.state";
import { IRecipe } from "../models/IRecipe";

export const selectorRecipes: MemoizedSelector<object, IRecipeState> = createFeatureSelector<IRecipeState>('recipes')

export const selectAllRecipes: MemoizedSelector<object, IRecipe[]> = createSelector(
  selectorRecipes,
  (state: IRecipeState) => state.recipes
);

export const selectRecipesLoading: MemoizedSelector<object, boolean> = createSelector(
  selectorRecipes,
  (state: IRecipeState) => state.loading
);

export const selectRecipesError: MemoizedSelector<object, string | null> = createSelector(
  selectorRecipes,
  (state: IRecipeState) => state.error
)