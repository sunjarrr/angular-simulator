import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {

  router: Router = inject(Router);
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;
  urlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.router.url);
  currentUrl$: Observable<string> = this.urlSubject.asObservable();

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
        tap(() => {
          this.urlSubject.next(this.router.url);
        })
      ).subscribe();
    }

}