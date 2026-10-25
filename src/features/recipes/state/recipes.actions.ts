import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRecipe } from '../models/IRecipe';

export const recipeActions = createActionGroup({
  source: 'Recipes',
  events: {
    'Load Recipes': emptyProps(),
    'Load Recipes Success': props<{ recipes: IRecipe[] }>(),
    'Load Recipes Failure': props<{ error: string }>(),
  }
})