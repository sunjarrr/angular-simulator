import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotesApiService {

  httpClient: HttpClient = inject(HttpClient)

  getQuotes() {
    return this.httpClient.get('https://dummyjson.com/quotes')
  }

}