import { Component, inject, OnInit } from '@angular/core';
import { QuotesStore } from '../../state/quotes.store';

@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {

  quotesStore = inject(QuotesStore);

  ngOnInit() {
    this.quotesStore.loadQuotes();
  }

}