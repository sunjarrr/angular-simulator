import { Component, inject, input, InputSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { Button } from "primeng/button";
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  imports: [Button, CardModule, CommonModule, FormsModule, CurrencyPipe, UpperCasePipe, TagModule, RatingModule, ButtonModule, DividerModule, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {

  product: InputSignal<IProduct> = input.required<IProduct>();
  cartService: CartService = inject(CartService);

  onAddCart(product: IProduct): void {
    this.cartService.addItem(product);
  }

}