import { Component, inject } from '@angular/core';
import { WidgetType } from '../app/Widget';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToggleSwitchChangeEvent, ToggleSwitchModule} from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { Theme } from '../enums/Theme';
import { AuthService } from '../features/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [SelectButtonModule, FormsModule, RouterLink, RouterLinkActive, CommonModule, ToggleSwitchModule, RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  currentWidget: WidgetType = 'date';
  timer: string = new Date().toLocaleString();
  counter: number = 0;
  selectedNavigationId: number = 2;
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  authorizationStatus$: Observable<boolean> = this.authService.status$;

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