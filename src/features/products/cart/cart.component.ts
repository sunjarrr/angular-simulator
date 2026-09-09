import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ICartItem } from '../interfaces/ICartItem';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  cartService: CartService = inject(CartService);
  cart: WritableSignal<ICartItem[]> = this.cartService.cart;
  itemsCount: Signal<number> = this.cartService.itemsCount;
  subtotal: Signal<number> = this.cartService.subtotal;
  total: Signal<number> = this.cartService.total;
  tax: Signal<number> = this.cartService.tax;
  taxRate: number = this.cartService.TAX_RATE;

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity)
  }

  deleteItem(itemId: number): void {
    this.cartService.deleteItem(itemId);
  }

}