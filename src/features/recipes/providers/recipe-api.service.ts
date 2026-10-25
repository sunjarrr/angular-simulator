import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipesResponse } from '../models/IRecipesResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  httpClient: HttpClient = inject(HttpClient);

  getRecipes(): Observable<IRecipesResponse> {
    return this.httpClient.get<IRecipesResponse>('https://dummyjson.com/recipes');
  }

}