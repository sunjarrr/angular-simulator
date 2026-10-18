import { createAction, props } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';

export const loadRecipes = createAction('[RECIPES PAGE] loadRecipes');

export const loadRecipesSuccess = createAction(
  '[RECIPES API] loadRecipesSuccess',
  props<{ recipes: IRecipe[] }>()
);

export const loadRecipesFailure = createAction(
  '[RECIPES API ERROR] loadRecipesFailure',
  props<{ error: string }>()
);