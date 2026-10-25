import { inject } from "@angular/core";
import { RecipeApiService } from "../providers/recipe-api.service";
import { Actions, createEffect, FunctionalEffect, ofType } from "@ngrx/effects";
import { recipeActions } from "./recipes.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { IRecipesResponse } from "../models/IRecipesResponse";

export const recipeEffects: FunctionalEffect = createEffect(
  (
    actions: Actions = inject(Actions),
    recipesApi: RecipeApiService = inject(RecipeApiService),
  ) => {
    return actions.pipe(
      ofType(recipeActions.loadRecipes),
      exhaustMap(() =>
        recipesApi.getRecipes().pipe(
          map((response: IRecipesResponse) => recipeActions.loadRecipesSuccess({ recipes: response.recipes })),
          catchError(() => of(recipeActions.loadRecipesFailure({ error: 'Ошибка загрузки рецептов' })))
        ),
      )
    );
  },
  { functional: true }
);