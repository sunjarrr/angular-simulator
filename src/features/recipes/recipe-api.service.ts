import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRecipesResponse } from './interfaces/IRecipesResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  httpClient: HttpClient = inject(HttpClient);

  getRecipes(): Observable<IRecipesResponse> {
    return this.httpClient.get<IRecipesResponse>('https://dummyjson.com/recipes');
  }

}