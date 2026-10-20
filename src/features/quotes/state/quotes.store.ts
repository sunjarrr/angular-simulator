import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { IQoutesState } from '../interfaces/IQuotesState';
import { IQuote } from '../interfaces/IQuote';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { QuotesApiService } from '../services/quotes-api.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IQuoteResponse } from '../interfaces/IQuoteResponse';

const initialState: IQoutesState = {
  quotes: [],
  favorites: [],
  loading: false,
  error: null,
  filterStatus: 'all',
  selectedQuote: 
}

export const QuotesStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    favoritesCount: computed(() => store.favorites().length),
    authorsCount: computed(() => {
      const quote = store.quotes().map((quotes) => quotes.author);
      const uniqueAuthors = new Set(quote)
      return uniqueAuthors.size;
    }),
    filteredQuotes: computed(() => {
      if (store.filterStatus() === 'favorites') {
        return store.favorites();
      } else {
        return store.quotes();
      }
    })
  })),

  withMethods((store, quotesApiService = inject(QuotesApiService)) => ({
    setFilter(status: 'all' |'favorites') {
      patchState(store, {
        filterStatus: status
      })
    },
    loadQuotes: rxMethod<void>(pipe(
        tap(() => {
          patchState(store, {
            loading: true,
            error: null
          })
        }),
        switchMap(() => {
          return quotesApiService.getQuotes();
        }),
        tapResponse({
          next: (response: IQuoteResponse) => patchState(store, { quotes: response.quotes, error: null, loading: false }),
          error: (err: HttpErrorResponse) => patchState(store, { error: err.message || 'Failed to load quotes', loading: false }),
        })
    )),
    toggleFavorite(quote: IQuote) {
      let updatedFavorites: IQuote[];
      const availibilityQuote = store.favorites().some((favoriteQuote: IQuote) => favoriteQuote.id === quote.id);
      if (availibilityQuote) {
        updatedFavorites = store.favorites().filter((favoriteQuote: IQuote) => favoriteQuote.id !== quote.id);
      } else {
        updatedFavorites = [...store.favorites(), quote]
      }
      patchState(store, {
        favorites: updatedFavorites
      })
    },
    selectRandomQuote() {
      const quotes = store.quotes();
      if (quotes.length === 0) {
        return;
      }
      const randIndex = Math.floor(Math.random() * quotes.length)
      const randQuote = quotes[randIndex]
      patchState(store, {
        selectedQuote: randQuote
      })
    }
  }))
)