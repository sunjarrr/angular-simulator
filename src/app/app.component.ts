import { Component } from '@angular/core';
import './training';
import './collection';
import { IConditions } from '../interfaces/IConditions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    conditions: IConditions[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'images/guide-icon.svg',
      bg: '#E5EEEB'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'images/safety-icon.svg',
      bg: '#E3E6EE'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/price-icon.svg',
      bg: '#F3F1E1'
    }
  ]

  location: string = '';
  dateOfHike: string = '';
  participants: string = '';
  time: string = '';
  date: string = '';
  value: number = 0;
  showTask: boolean = true;
  inputLiveText: string = '';
  pageLoading: boolean = true;
  companyName: string = 'румтибет';

  tourLocations: string[] = [
    'Мадрид',
    'Париж',
    'Лондон',
    'Берлин',
    'Монако',
    'Барселона'
  ]

  tourParticipants: string[] = [
    'Санжар',
    'Влад',
    'Нигина',
    'Нурбек',
    'Даурен',
    'Магфират'
  ]

  constructor() {
    setInterval((): void => {
      const date: Date = new Date();
      this.date = date.toLocaleDateString();
    })
    setInterval((): void => {
      const time: Date = new Date();
      this.time = time.toLocaleTimeString();
    })
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

  plusValue(): void {
    const plus: number = Number(this.value) + 1;
    this.value = plus;
  }

  minusValue(): void {
    const minus: number = Number(this.value) - 1;
    this.value = minus;
  }

  changeTask(): void {
    this.showTask = !this.showTask;
  }

  private ngOnInit(): void {
    setTimeout((): void => {
      this.pageLoading = !this.pageLoading;
    }, 2000)
  }
}

