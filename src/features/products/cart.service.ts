import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ICartItem } from './interfaces/ICartItem';
import { IProduct } from './interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cart: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  readonly TAX_RATE = 0.2;

  subtotal: Signal<number> = computed(() => {
    return this.cart().reduce((accum, item: ICartItem) => accum + item.price * item.quantity, 0);
  });

  itemsCount: Signal<number> = computed(() => {
    return this.cart().reduce((accum, item) => accum + item.quantity, 0);
  });

  tax: Signal<number> = computed(() => this.subtotal() * this.TAX_RATE);
  total: Signal<number> = computed(() => this.subtotal() + this.tax());

  addItem(product: IProduct): void {
    this.cart.update((items: ICartItem[]) => {
      const item: ICartItem | undefined = items.find(item => item.id === product.id);
      if (item) {
        return items.map((item: ICartItem) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        const newItem: ICartItem = {
          ...product,
          quantity: 1,
          total: product.price,
          discountedTotal: product.price
        }
        return [...items, newItem];
      }
    })
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      return this.deleteItem(productId);
    } else {
      this.cart.update((items: ICartItem[]) => items.map((item: ICartItem) => item.id === productId ? { ...item, quantity } : item));
    }
  }

  deleteItem(productId: number): void {
    this.cart.update(items => items.filter((item: ICartItem) => item.id !== productId));
  }

}