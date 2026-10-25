import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllRecipes, selectRecipesError, selectRecipesLoading } from '../state/recipes.selector';
import { IRecipe } from '../models/IRecipe';
import { recipeActions } from '../state/recipes.actions';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {

  private store: Store = inject(Store)

  recipes: Signal<IRecipe[]> = this.store.selectSignal(selectAllRecipes);
  loading: Signal<boolean> = this.store.selectSignal(selectRecipesLoading);
  error: Signal<string | null> = this.store.selectSignal(selectRecipesError);

  ngOnInit(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }

  onReload(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }

}