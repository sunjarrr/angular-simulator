import { createReducer, on } from '@ngrx/store';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';
import { IRecipeState } from '../interfaces/IRecipeState';

export const initialState: IRecipeState = {
  recipes: [],
  loading: false,
  error: null,
}

export const recipeReducer = createReducer(
  initialState,

  on(loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    loading: false,
    recipes: recipes
  })),

  on(loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: null
  }))
)