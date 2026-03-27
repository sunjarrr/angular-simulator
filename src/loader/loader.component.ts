import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '../loader.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loader-component',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);
  loader$: Observable<boolean> = this.loaderService.loader$;

  constructor() {
    this.loader$.pipe<boolean>(
      tap<boolean>(loader => {
        document.body.style.overflow = loader ? 'hidden' : '';
      })
    ).subscribe();
  }
}
