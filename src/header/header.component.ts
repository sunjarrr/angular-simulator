import { Component, inject, OnInit } from '@angular/core';
import { WidgetType } from '../app/Widget';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToggleSwitchChangeEvent, ToggleSwitchModule} from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { Theme } from '../enums/Theme';
import { AuthService } from '../features/auth/auth.service';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { IAuthUser } from '../features/auth/IAuthUser';

@Component({
  selector: 'app-header',
  imports: [SelectButtonModule, FormsModule, RouterLink, RouterLinkActive, CommonModule, ToggleSwitchModule, RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  companyName: string = 'румтибет';
  currentWidget: WidgetType = 'date';
  timer: string = new Date().toLocaleString();
  counter: number = 0;
  selectedNavigationId: number = 2;
  authorizationStatus$: Observable<IAuthUser | null> = this.authService.userStatus$;
  urlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.router.url);
  currentUrl$: Observable<string> = this.urlSubject.asObservable();

  navigations: INavigation[] = [
    {
      id: 1,
      text: 'Главная',
    },
    {
      id: 2,
      text: 'Пользователи',
    }
  ];

  constructor() {
    setInterval(() => {
      this.timer = new Date().toLocaleString();
    }, 1000);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
        tap(() => {
          this.urlSubject.next(this.router.url);
          console.log(this.router.url);
        })
      ).subscribe();
    }

  switchWidget(widget: WidgetType): void {
    this.currentWidget = widget;
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  toggleMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  toggleTheme(value: Theme): void {
    this.themeService.switchTheme(value);
  }

  onLogout(): void {
    this.authService.logout();
  }

}