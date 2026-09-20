import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ICartItem } from '../interfaces/ICartItem';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe, Button],
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

  ngOnInit(): void {
    if (!this.cartService.cartId()) {
      const minUserId: number = 1;
      const maxUserId: number = 50;
      const randomUserId: number = Math.floor(Math.random() * (maxUserId- minUserId + 1) + minUserId)
      this.cartService.loadUserCart(randomUserId);
    }
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity)
  }

  deleteItem(itemId: number): void {
    this.cartService.deleteItem(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

}