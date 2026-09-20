import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartResponse } from './interfaces/ICartResponse';
import { ICart } from './interfaces/ICart';
import { ICartRequest } from './interfaces/ICartRequest';

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

  createCart(cart: ICartRequest): Observable<ICart> {
    return this.httpClient.post<ICart>(`${ this.CARTS_API }/add`, cart);
  }

  updateCart(id: number, payload: ICartRequest): Observable<ICart> {
    return this.httpClient.put<ICart>(`${ this.CARTS_API }/${ id }`, payload);
  }

  deleteCart(id: number): Observable<ICart> {
    return this.httpClient.delete<ICart>(`${ this.CARTS_API }/${ id }`)
  }

  getCartsByUser(userId: number): Observable<ICartResponse> {
     return this.httpClient.get<ICartResponse>(`${ this.CARTS_API }/user/${ userId }`);
  }

}