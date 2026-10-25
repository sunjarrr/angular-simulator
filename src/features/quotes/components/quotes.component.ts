import { Component, inject, OnInit } from '@angular/core';
import { QuotesStore } from '../store/quotes.store';

@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {

  readonly quotesStore: InstanceType<typeof QuotesStore> = inject(QuotesStore);

  ngOnInit(): void {
    this.quotesStore.loadQuotes();
  }

}