import { computed, inject, Injectable, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { IProductResponse } from './interfaces/IProductResponse';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, EMPTY, finalize, Observable } from 'rxjs';
import { MessageService } from '../../message.service';
import { ProductApiService } from './product-api.service';
import { IProduct } from './interfaces/IProduct';
import { LoaderService } from '../../loader.service';
import { IProductParam } from './interfaces/IProductParam';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductSortField } from '../../enums/ProductSortField';
import { SortDirection } from '../../enums/SortDirections';
import { PaginatorState } from 'primeng/paginator';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productApiService: ProductApiService = inject(ProductApiService);
  messageService: MessageService = inject(MessageService)
  loaderService: LoaderService = inject(LoaderService);
  productSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  page: WritableSignal<number> = signal(1);
  pageSize: WritableSignal<number> = signal(10);
  skip: Signal<number> = computed(() => (this.page() - 1) * this.pageSize());
  sortField: WritableSignal<ProductSortField> = signal(ProductSortField.TITLE);
  directionsField: WritableSignal<SortDirection> = signal<SortDirection>(SortDirection.ASC);
  categories: WritableSignal<string | null> = signal('');
  searchProduct: WritableSignal<string> = signal<string>('');
  debouncedSearch: Signal<string> = toSignal(
    this.productSubject.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    ),
    { initialValue: '' }
  );

  productsResource: ResourceRef<IProductResponse | undefined> = rxResource({
    params: () => ({
      search: this.debouncedSearch(),
      skip: this.skip(),
      limit: this.pageSize(),
      field: this.sortField(),
      order: this.directionsField(),
      category: this.categories()
    }),
    stream: ({ params }: { params: IProductParam }) => this.getProducts(params)
  });

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

  pageChange(event: PaginatorState): void {
    if (event.rows !== undefined) {
      this.pageSize.set(event.rows);
    }
    if (event.first !== undefined) {
      const nextPage: number = Math.floor(event.first / this.pageSize()) + 1;
      this.page.set(nextPage);
    }
  }

  inputChange(value: string): void {
    this.page.set(1);
    this.searchProduct.set(value);
    this.productSubject.next(value);
  }

  sortChange(field: ProductSortField): void {
    this.page.set(1);
    this.sortField.set(field);
  }

  directionChange(direction: SortDirection): void {
    this.page.set(1);
    this.directionsField.set(direction);
  }

  categoryChange(category: string | null): void {
    this.page.set(1);
    this.categories.set(category);
  }

}