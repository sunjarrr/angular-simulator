import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartResponse } from './interfaces/ICartResponse';
import { ICart } from './interfaces/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  httpClient: HttpClient = inject(HttpClient);
  CARTS_API: string = 'https://dummyjson.com/carts'

  getCarts(): Observable<ICartResponse> {
    return this.httpClient.get<ICartResponse>(`${ this.CARTS_API }`);
  }

  getCartById(id: number): Observable<ICart> {
    return this.httpClient.get<ICart>(`${ this.CARTS_API }/${ id }`);
  }

  createCart(cart: Partial<ICart>): Observable<ICart> {
    return this.httpClient.post<ICart>(`${ this.CARTS_API }/add`, cart);
  }

  updateCart(id: number, cart: Partial<ICart>): Observable<ICart> {
    return this.httpClient.put<ICart>(`${ this.CARTS_API }/${ id }`, cart);
  }

  deleteCart(id: number): Observable<ICart> {
    return this.httpClient.delete<ICart>(`${ this.CARTS_API }/${ id }`)
  }

}