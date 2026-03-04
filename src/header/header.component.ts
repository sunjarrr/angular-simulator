import { Component } from '@angular/core';
import { WidgetType } from '../app/Widget';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  currentWidget: WidgetType = 'date';
  timer: string = new Date().toLocaleString();
  counter: number = 0;
  selectedNavigationId: number = 2;

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
}