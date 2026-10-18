import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllRecipes, selectRecipesError, selectRecipesLoading } from '../state/recipes.selector';
import { loadRecipes } from '../state/recipes.actions';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {

  store: Store = inject(Store)

  recipes = this.store.selectSignal(selectAllRecipes);
  loading = this.store.selectSignal(selectRecipesLoading);
  error = this.store.selectSignal(selectRecipesError);

  ngOnInit() {
    this.store.dispatch(loadRecipes());
  }

  onReload() {
    this.store.dispatch(loadRecipes());
  }

}