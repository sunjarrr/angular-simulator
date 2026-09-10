import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProductResponse } from './interfaces/IProductResponse';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';
import { IProductParam } from './interfaces/IProductParam';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private httpClient: HttpClient = inject(HttpClient);
  PRODUCTS_API = 'https://dummyjson.com/products/';

  getProduct(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${ this.PRODUCTS_API }${ id }`);
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${ this.PRODUCTS_API }category-list`);
  }

  getProducts(params: IProductParam): Observable<IProductResponse> {
    const sort: string = params.field ? `&sortBy=${ params.field }&order=${ params.order }` : '';
    const paginationParams: string = `skip=${ params.skip }&limit=${ params.limit }${ sort }`;
    const endpoint: string = params.search ? `search?q=${ params.search }&` : params.category ? `category/${params.category}?` : '?';
    const url: string = `${ this.PRODUCTS_API }${ endpoint }${ paginationParams }`
    return this.httpClient.get<IProductResponse>(url);
  }

}
