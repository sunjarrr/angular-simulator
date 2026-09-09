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

  getCarts(): Observable<ICartResponse> {
    return this.httpClient.get<ICartResponse>('https://dummyjson.com/carts');
  }

  getCartById(id: number): Observable<ICart> {
    return this.httpClient.get<ICart>(`https://dummyjson.com/carts/${ id }`);
  }

  createCart(cart: Partial<ICart>): Observable<ICart> {
    return this.httpClient.post<ICart>('https://dummyjson.com/carts/add', cart);
  }

  updateCart(id: number, cart: Partial<ICart>): Observable<ICart> {
    return this.httpClient.put<ICart>(`https://dummyjson.com/carts/${ id }`, cart);
  }

  deleteCart(id: number): Observable<ICart> {
    return this.httpClient.delete<ICart>(`https://dummyjson.com/carts/${ id }`)
  }

}