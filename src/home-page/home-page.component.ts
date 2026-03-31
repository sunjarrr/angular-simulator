import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { IPlace } from '../interfaces/IPlace';
import { IArticle } from '../interfaces/IArticle';
import { LocalStorageService } from '../local-storage.service';
import { IAdvantageInfo } from '../interfaces/IAdvantageInfo';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  selectedLocation: string = '';
  selectedHikingDate: string = '';
  selectedParticipants: string = '';
  liveInputValue: string = '';
  selectedArticleId: number = 2;

  conditions: IAdvantageInfo[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E5EEEB',
      icon: 'humans-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#E3E6EE',
      icon: 'safety-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      bg: '#F3F1E1',
      icon: 'price-icon',
    },
  ];

  detailsPlaces: IPlace[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      placeImage: 'lake-near-mountains',
      assessment: '4.9',
      assessmentIcon: 'star-icon',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      placeImage: 'night-mountains',
      assessment: '4.5',
      assessmentIcon: 'star-icon',
    },
    {
      id: 3,
      title: 'Спорт в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      placeImage: 'mountains-sport',
      assessment: '5.0',
      assessmentIcon: 'star-icon',
    },
  ];

  articles: IArticle[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
      image: 'italy',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
      image: 'clouds-aiplane',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
      image: 'alley-human',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
      image: 'india',
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

  private saveLastVisit(): void {
    const date: Date = new Date();
    this.localStorageService.setValues('lastVisit', date);
  }

  private saveVisitCount(): void {
    const storedCount: number | null = this.localStorageService.getValues<number>('visitCount') ?? 0;
    let count: number = !storedCount ? 1 : storedCount + 1;
    this.localStorageService.setValues('visitCount', count);
  }

}