import { Component, inject } from '@angular/core';
import { WidgetType } from '../app/Widget';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';
import { ITheme } from '../interfaces/ITheme';

@Component({
  selector: 'app-header',
  imports: [SelectButtonModule, FormsModule, RouterLink, RouterLinkActive, CommonModule, ToggleSwitchModule],
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
  state$: Observable<ITheme> = this.themeService.switchMode$;

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

  toggleMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleTheme(value: string): void {
    this.themeService.setTheme(value);
  }

}