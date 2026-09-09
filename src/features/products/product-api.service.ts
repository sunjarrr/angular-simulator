import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProductResponse } from './interfaces/IProductResponse';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';
import { IProductParams } from './interfaces/IProductParams';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private httpClient: HttpClient = inject(HttpClient);

  getProduct(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`https://dummyjson.com/products/${ id }`);
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>('https://dummyjson.com/products/category-list');
  }

  getProducts(params: IProductParams): Observable<IProductResponse> {
    const sort = params.field ? `&sortBy=${ params.field }&order=${ params.order }` : '';
    const paginationParams = `skip=${ params.skip }&limit=${ params.limit }${ sort }`;
    const endpoint = params.search ? `search?q=${ params.search }&` : params.category ? `category/${params.category}?` : '?';
    const url = `https://dummyjson.com/products/${ endpoint }${ paginationParams }`
    return this.httpClient.get<IProductResponse>(url);
  }

}
