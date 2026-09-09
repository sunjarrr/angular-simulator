import { Component, computed, inject, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { IProduct } from '../interfaces/IProduct';
import { ProductService } from '../product.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaginatorState } from "primeng/paginator";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { LoaderService } from '../../../loader.service';
import { SelectModule } from 'primeng/select';
import { CartService } from '../cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IProductResponse } from '../interfaces/IProductResponse';
import { InputText } from "primeng/inputtext";
import { AvailabilityStatus } from '../../../enums/AvailabilityStatus';
import { ProductSortField } from '../../../enums/ProductSortField';
import { SortDirection } from '../../../enums/SortDirections';

@Component({
  selector: 'app-products',
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule, SkeletonModule, SelectButtonModule, FormsModule, SelectModule, TranslatePipe, RouterLink, InputText],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);
  cartService: CartService = inject(CartService);
  loaderService: LoaderService = inject(LoaderService);
  productSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  products$: Observable<string> = this.productSubject.asObservable();
  totalProducts: number = 0;
  pageList = [...Array(10).keys()].map((page: number) => page + 1);
  isLoading: Signal<boolean> = toSignal(this.loaderService.isLoading$, { initialValue: false });
  page: WritableSignal<number> = signal(1);
  pageSize: WritableSignal<number> = signal(10);
  skip: Signal<number> = computed(() => (this.page() - 1) * this.pageSize());
  searchProduct: WritableSignal<string> = signal<string>('');
  total: WritableSignal<number> = signal<number>(0);
  sortField: WritableSignal<ProductSortField> = signal(ProductSortField.TITLE);
  directionsField: WritableSignal<SortDirection> = signal<SortDirection>(SortDirection.ASC);
  categories: WritableSignal<string | null> = signal('');
  categoryList: Signal<string[]> = toSignal(this.productService.getCategories(), { initialValue: [] })
  debouncedSearch: Signal<string> = toSignal(
    this.productSubject.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    ),
    { initialValue: '' }
  );

  fieldList: { label: string; value: ProductSortField}[] = [
    { label: 'Название', value: ProductSortField.TITLE },
    { label: 'Цена', value: ProductSortField.PRICE },
    { label: 'Рейтинг', value: ProductSortField.RATING },
    { label: 'На складе', value: ProductSortField.STOCK }
  ]

  directions: { label: string; value: SortDirection}[] = [
    { label: 'по возрастанию', value: SortDirection.ASC },
    { label: 'по убыванию', value: SortDirection.DESC }
  ]

  productsResource: ResourceRef<IProductResponse | undefined> = rxResource({
    params: () => ({
      search: this.debouncedSearch(),
      skip: this.skip(),
      limit: this.pageSize(),
      field: this.sortField(),
      order: this.directionsField(),
      category: this.categories()
    }),
    stream: ({ params }) => this.productService.getProducts(params)
  });

  getSeverity (product: IProduct): AvailabilityStatus | null {
    switch (product.availabilityStatus) {
      case 'INSTOCK':
        return AvailabilityStatus.SUCCESS;
      case 'LOWSTOCK':
        return AvailabilityStatus.WARN;
      case 'OUTOFSTOCK':
        return AvailabilityStatus.DANGER;
      default:
        return null;
    }
  };

  onProductSelect(id: number): void {
    this.router.navigate([`/products/${id}`]);
  }

  onPageChange(event: PaginatorState): void {
    if (event.rows !== undefined) {
      this.pageSize.set(event.rows);
    }
    if (event.first !== undefined) {
      const nextPage = Math.floor(event.first / this.pageSize()) + 1;
      this.page.set(nextPage);
    }
  }

  onInputChange(value: string): void {
    this.page.set(1);
    this.productSubject.next(value);
  }

  onSortChange(field: ProductSortField): void {
    this.page.set(1);
    this.sortField.set(field);
  }

  onDirectionChange(direction: SortDirection): void {
    this.page.set(1);
    this.directionsField.set(direction);
  }

  onCategoryChange(category: string | null): void {
    this.page.set(1);
    this.categories.set(category);
  }

  onAddCart(product: IProduct): void {
    this.cartService.addItem(product);
  }

}