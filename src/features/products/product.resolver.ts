import { ResolveFn } from '@angular/router';
import { ProductService } from './product.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';

export const productResolver: ResolveFn<Observable<IProduct>> = (route) => {
  const productService: ProductService = inject(ProductService);
  const product: string = route.paramMap.get('id')!;
  const parse: number = +product;

  return productService.getProduct(parse);
};
