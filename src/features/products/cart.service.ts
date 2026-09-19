import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ICartItem } from './interfaces/ICartItem';
import { IProduct } from './interfaces/IProduct';
import { CartApiService } from './cart-api.service';
import { ICartResponse } from './interfaces/ICartResponse';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ICart } from './interfaces/ICart';
import { ICartRequest } from './interfaces/ICartRequest';
import { LoaderService } from '../../loader.service';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartApiService: CartApiService = inject(CartApiService);
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  cart: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  cartId: WritableSignal<number | null> = signal<number | null>(null);
  readonly TAX_RATE: number = 0.2;

  private checkCartId(action: (cartId: number) => void): void {
    const currentCartId: number | null = this.cartId();
    if (currentCartId) {
      action(currentCartId);
    }
  }

  subtotal: Signal<number> = computed(() => {
    return this.cart().reduce((accum, item: ICartItem) => accum + item.price * item.quantity, 0);
  });

  itemsCount: Signal<number> = computed(() => {
    return this.cart().reduce((accum: number, item: ICartItem) => accum + item.quantity, 0);
  });

  tax: Signal<number> = computed(() => this.subtotal() * this.TAX_RATE);
  total: Signal<number> = computed(() => this.subtotal() + this.tax());

  addItem(product: IProduct): void {
    this.cart.update((items: ICartItem[]) => {
      const item: ICartItem | undefined = items.find((item: ICartItem) => item.id === product.id);
      if (item) {
        return items.map((item: ICartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      const newItem: ICartItem = {
        ...product,
        quantity: 1,
        total: product.price,
        discountedTotal: product.price
      }
      return [...items, newItem];
    });
    const currentId: number | null = this.cartId();
    if (currentId) {
      this.updateCart()
    } else {
      this.cartApiService.createCart({
        userId: 1,
        products: [{ id: product.id, quantity: 1 }]
      }).pipe(
        tap((newCart: ICart) => {
          this.cartId.set(newCart.id)
        })
      ).subscribe()
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      return this.deleteItem(productId);
    } else {
      this.cart.update((items: ICartItem[]) => items.map((item: ICartItem) => item.id === productId ? { ...item, quantity } : item));
      this.updateCart();
    }
  }

  deleteItem(productId: number): void {
    this.cart.update((items: ICartItem[]) => items.filter((item: ICartItem) => item.id !== productId));
    this.updateCart();
  }

  loadUserCart(userId: number) {
    this.cartApiService.getCartsByUser(userId)
      .pipe(
        tap((response: ICartResponse) => {
          const userCart: ICart = response.carts[0]
          if (userCart) {
            this.cart.set(userCart.products)
            this.cartId.set(userCart.id);
          }
        })
      ).subscribe()
  }

  updateCart(): void {
    this.checkCartId((currentCartId: number) => {
    const productsPayload: ICartRequest['products'] = this.cart().map((item: ICartItem) => ({
      id: item.id,
      quantity: item.quantity
    }));
    this.cartApiService.updateCart(currentCartId, { products: productsPayload })
      .pipe(
        tap((response: ICart) => {
          if (response?.products) {
            this.cart.set(response.products);
          }
        })
      ).subscribe()
      })
  }

  clearCart(): void {
    this.checkCartId((currentCartId: number) => {
    this.loaderService.showLoader();
    this.cartApiService.deleteCart(currentCartId)
      .pipe(
        tap(() => {
          this.cart.set([]);
          this.cartId.set(null);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showError('Не удалось удалить корзину');
          return EMPTY;
        }),
      ).subscribe();
    });
  }

}