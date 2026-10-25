import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { recipeActions } from './recipes.actions';
import { initialRecipeState, IRecipeState } from './recipes.state';

export const recipeReducer: ActionReducer<IRecipeState, Action<string>> = createReducer(
  initialRecipeState,
  on(recipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(recipeActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes: recipes,
    loading: false,
    error: null
  })),
  on(recipeActions.loadRecipesFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Ошибка загрузки рецептов'
  }))
)