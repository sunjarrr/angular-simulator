import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  turnOnSpinner(): void {
    this.loaderSubject.next(true);
  }

  turnOffSpinner(): void {
    this.loaderSubject.next(false);
  }
}
