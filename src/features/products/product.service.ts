import { inject, Injectable } from '@angular/core';
import { IProductResponse } from './interfaces/IProductResponse';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { MessageService } from '../../message.service';
import { ProductApiService } from './product-api.service';
import { IProduct } from './interfaces/IProduct';
import { LoaderService } from '../../loader.service';
import { HttpClient } from '@angular/common/http';
import { IProductParam } from './interfaces/IProductParam';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productApiService: ProductApiService = inject(ProductApiService);
  messageService: MessageService = inject(MessageService)
  loaderService: LoaderService = inject(LoaderService);
  httpClient: HttpClient = inject(HttpClient);

  getProduct(id: number): Observable<IProduct> {
    this.loaderService.showLoader();
    return this.productApiService.getProduct(id).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      }),
      catchError(() => {
        this.messageService.showError('Не удалось получить продукт');
        return EMPTY;
      }),
    );
  }

  getCategories(): Observable<string[]> {
    return this.productApiService.getAllCategories();
  }

  getProducts(params: IProductParam): Observable<IProductResponse> {
    return this.productApiService.getProducts(params);
  }

}