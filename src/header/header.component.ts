import { Component, inject } from '@angular/core';
import { WidgetType } from '../app/Widget';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { Theme } from '../enums/Theme';
import { AuthService } from '../features/auth/auth.service';
import { Observable } from 'rxjs';
import { IAuthUser } from '../features/auth/IAuthUser';
import { applicationConfig } from '../config.token';
import { IApplicationConfig } from '../interfaces/IApplicationConfig';
import { LanguageService } from '../language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Language } from '../enums/Language';

@Component({
  selector: 'app-header',
  imports: [
    SelectButtonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ToggleSwitchModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  languageService: LanguageService = inject(LanguageService);
  currentWidget: WidgetType = 'date';
  timer: Date = new Date();
  lastLogin: Date = new Date();
  config: IApplicationConfig = inject(applicationConfig);
  counter = 0;
  selectedNavigationId = 2;
  authorizationStatus$: Observable<IAuthUser | null> = this.authService.currentUser$;

  navigations: INavigation[] = [
    {
      id: 1,
      text: 'header.headerMain',
    },
    {
      id: 2,
      text: 'header.users',
    },
  ];

  languages: Language[] = [Language.EN, Language.KK, Language.RU];

  constructor() {
    setInterval(() => {
      this.timer = new Date();
    }, 1000);
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

  logout(): void {
    this.authService.logout();
  }

  onLanguageChange(event: Event): void {
    const eventTarget: string = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(eventTarget);
  }

}
