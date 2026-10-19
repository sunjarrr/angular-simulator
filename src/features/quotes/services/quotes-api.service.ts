import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuoteResponse } from '../interfaces/IQuoteResponse';

@Injectable({
  providedIn: 'root',
})
export class QuotesApiService {

  private httpClient: HttpClient = inject(HttpClient)

  getQuotes(): Observable<IQuoteResponse> {
    return this.httpClient.get<IQuoteResponse>('https://dummyjson.com/quotes')
  }

}