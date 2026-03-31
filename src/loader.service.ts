import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.loaderSubject.asObservable();

  showLoader(): void {
    this.loaderSubject.next(true);
  };

  hideLoader(): void {
    this.loaderSubject.next(false);
  };

};