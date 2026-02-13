import { Component } from '@angular/core';
import './training';
import './collection';
import { IAdvantageInfo } from '../interfaces/IAdvantageInfo';
import { FormsModule } from '@angular/forms';
import { WidgetType } from './Widget';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  selectedLocation: string = '';
  selectedHikingDate: string = '';
  selectedParticipants: string = '';
  timer: string = new Date().toLocaleString();
  counter: number = 0;
  currentWidget: WidgetType = 'date';
  liveInputValue: string = '';
  isLoading: boolean = true;
  companyName: string = 'румтибет';

  conditions: IAdvantageInfo[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E5EEEB',
      icon: 'humans-icon'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E3E6EE',
      icon: 'safety-icon'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#F3F1E1',
      icon: 'price-icon'
    },
  ];

  tourLocations: string[] = [
    'Мадрид',
    'Париж',
    'Лондон',
    'Берлин',
    'Монако',
    'Барселона'
  ];

  tourParticipants: string[] = [
    'Санжар',
    'Влад',
    'Нигина',
    'Нурбек',
    'Даурен',
    'Магфират'
  ];

  constructor() {
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 2000);

    setInterval(() => {
      this.timer = new Date().toLocaleString();
    }, 1000);

    this.saveLastVisit();

    this.saveVisitCount();
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  switchWidget(widget: WidgetType): void {
    this.currentWidget = widget;
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisit(): void {
    const date: Date = new Date();
    localStorage.setItem('lastVisit', JSON.stringify(date));
  }

  private saveVisitCount(): void {
    const storedCount: string | null = localStorage.getItem('visitCount');
    let count: number = !storedCount ? 1 :  Number(storedCount) + 1;
    localStorage.setItem('visitCount', JSON.stringify(count));
  }
}