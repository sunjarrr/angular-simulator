import { inject } from "@angular/core";
import { RecipeApiService } from "../recipe-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadRecipesFailure } from "./recipes.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import * as RecipesActions from './recipes.actions';

export const recipeEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    recipesApi = inject(RecipeApiService),
  ) => {
    return actions$.pipe(
      ofType(RecipesActions.loadRecipes),
      exhaustMap(() =>
        recipesApi.getRecipes().pipe(
          map(response => RecipesActions.loadRecipesSuccess({ recipes: response.recipes })),
          catchError((err) => of(loadRecipesFailure({ error: err.message })))
        ),
      )
    );
  },
  { functional: true }
);