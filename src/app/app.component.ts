import { Component } from '@angular/core';
import './training';
import './collection';
import { ICondition } from '../interfaces/ICondition';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly humansIcon: string = '/images/humans-icon.svg';
  readonly priceIcon: string = '/images/price-icon.svg';
  readonly safetyIcon: string = '/images/safety-icon.svg';
  location: string = '';
  hikingDate: string = '';
  participants: string = '';
  time: string = '';
  date: string = '';
  counter: number = 0;
  showTask: boolean = true;
  inputLiveText: string = '';
  loadingPage: boolean = true;
  companyName: string = 'румтибет';

  conditions: ICondition[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E5EEEB'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E3E6EE'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#F3F1E1'
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
      this.loadingPage = !this.loadingPage;
    }, 2000);
    setInterval(() => {
      const date: Date = new Date();
      this.date = date.toLocaleString();
    }, 1000);
    this.saveLastVisit();
    this.saveVisitCount();
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

  increaseCounterValue(): void {
    this.counter++;
  }

  reduceCounterValue(): void {
    this.counter--;
  }

  switchTask(): void {
    this.showTask = !this.showTask;
  }
}

