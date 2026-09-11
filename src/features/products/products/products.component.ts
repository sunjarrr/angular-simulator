import { Component, inject, ResourceRef, Signal, WritableSignal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { IProduct } from '../interfaces/IProduct';
import { ProductService } from '../product.service';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaginatorState } from "primeng/paginator";
import { toSignal } from '@angular/core/rxjs-interop';
import { LoaderService } from '../../../loader.service';
import { SelectModule } from 'primeng/select';
import { CartService } from '../cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IProductResponse } from '../interfaces/IProductResponse';
import { InputText } from "primeng/inputtext";
import { AvailabilityStatus } from '../../../enums/AvailabilityStatus';
import { ProductSortField } from '../../../enums/ProductSortField';
import { SortDirection } from '../../../enums/SortDirections';
import { ISortOption } from '../interfaces/ISortOption';

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
  pageList: number[] = [...Array(10).keys()].map((page: number) => page + 1);
  page: WritableSignal<number> = this.productService.page;
  pageSize: WritableSignal<number> = this.productService.pageSize;
  skip: Signal<number> = this.productService.skip;
  searchProduct: WritableSignal<string> = this.productService.searchProduct;
  sortField: WritableSignal<ProductSortField> = this.productService.sortField;
  directionsField: WritableSignal<SortDirection> = this.productService.directionsField;
  categories: WritableSignal<string | null> = this.productService.categories;
  categoryList: Signal<string[]> = toSignal(this.productService.getCategories(), { initialValue: [] });
  productsResource: ResourceRef<IProductResponse | undefined> = this.productService.productsResource;

  fieldList: ISortOption[] = [
    { label: 'Название', value: ProductSortField.TITLE },
    { label: 'Цена', value: ProductSortField.PRICE },
    { label: 'Рейтинг', value: ProductSortField.RATING },
    { label: 'На складе', value: ProductSortField.STOCK }
  ]

  directions: ISortOption[] = [
    { label: 'по возрастанию', value: SortDirection.ASC },
    { label: 'по убыванию', value: SortDirection.DESC }
  ]

  getSeverity(product: IProduct): AvailabilityStatus | null {
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
    this.router.navigate([`/products/${ id }`]);
  }

  onPageChange(event: PaginatorState): void {
    this.productService.pageChange(event);
  }

  onInputChange(value: string): void {
    this.productService.inputChange(value);
  }

  onSortChange(field: ProductSortField): void {
    this.productService.sortChange(field);
  }

  onDirectionChange(direction: SortDirection): void {
    this.productService.directionChange(direction);
  }

  onCategoryChange(category: string | null): void {
    this.productService.categoryChange(category);
  }

  onAddCart(product: IProduct): void {
    this.cartService.addItem(product);
  }

}