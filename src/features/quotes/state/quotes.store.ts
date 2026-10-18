import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { IQoutesState } from '../interfaces/IQuotesState';
import { IQuote } from '../interfaces/IQuote';
import { QuotesService } from '../services/quotes.service';

const initialState: IQoutesState = {
  quotes: [],
  favorites: [],
  loading: false,
  error: null,
  filterStatus: 'all'
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

  withMethods((store) => ({
    setFilter(status: 'all' |'favorites') {
      patchState(store, {
        filterStatus: status
      })
    },
    loadQuotes() {
      patchState(store, {
        loading: true,
        error: null
      })
      const quotesService: QuotesService = inject(QuotesService);
      quotesService.getQuotes();
     if (getQuotes) { 
        const newQuotesList = store.quotes();
        patchState(store, {
          quotes: newQuotesList,
          loading: false
        })
      } else {
        patchState(store, {
          error: 'Не удалось загрузить данные',
          loading: false
        })
      }
    },
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