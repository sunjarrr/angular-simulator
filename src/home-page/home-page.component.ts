import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { IPlace } from '../interfaces/IPlace';
import { IArticle } from '../interfaces/IArticle';
import { LocalStorageService } from '../local-storage.service';
import { IAdvantageInfo } from '../interfaces/IAdvantageInfo';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  IconDefinition,
  faCalendar,
  faCaretSquareDown,
  faCaretSquareRight,
} from '@fortawesome/free-regular-svg-icons';
import { faPeopleGroup, faShield, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, DatePipe, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  selectedLocation = '';
  selectedHikingDate = '';
  selectedParticipants = '';
  liveInputValue = '';
  selectedArticleId = 2;
  faStar: IconDefinition = faStar;
  faCalendar: IconDefinition = faCalendar;
  faCaretSquareDown: IconDefinition = faCaretSquareDown;
  faCaretSquareRight: IconDefinition = faCaretSquareRight;

  conditions: IAdvantageInfo[] = [
    {
      id: 1,
      title: 'main.ourOffer.conditionsOne',
      description:
        'main.ourOffer.conditionsDescription',
      bg: '#E5EEEB',
      icon: faPeopleGroup,
    },
    {
      id: 2,
      title: 'main.ourOffer.conditionsTwo',
      description:
        'main.ourOffer.conditionsDescription',
      bg: '#E3E6EE',
      icon: faShield,
    },
    {
      id: 3,
      title: 'main.ourOffer.conditionsThree',
      description:
        'main.ourOffer.conditionsDescription',
      bg: '#F3F1E1',
      icon: faDollarSign,
    },
  ];

  detailsPlaces: IPlace[] = [
    {
      id: 1,
      title: 'main.directions.firstDirectionTitle',
      description: 'main.directions.firstDirectionDescription',
      price: 480,
      placeImage: 'lake-near-mountains',
      assessment: '4.9',
    },
    {
      id: 2,
      title: 'main.directions.secondDirectionTitle',
      description: 'main.directions.secondDirectionDescription',
      price: 500,
      placeImage: 'night-mountains',
      assessment: '4.5',
    },
    {
      id: 3,
      title: 'main.directions.thirdDirectionTitle',
      description: 'main.directions.thirdDirectionDescription',
      price: 230,
      placeImage: 'mountains-sport',
      assessment: '5.0',
    },
  ];

  articles: IArticle[] = [
    {
      id: 1,
      title: 'main.travelBlog.firstArticleTitle',
      description:
        'main.travelBlog.firstArticleDescription',
      date: '01/04/2023',
      link: 'main.travelBlog.readArticle',
      image: 'italy',
    },
    {
      id: 2,
      title: 'main.travelBlog.secondArticleTitle',
      description:
        'main.travelBlog.secondArticleDescription',
      date: '01/04/2023',
      link: 'main.travelBlog.readArticle',
      image: 'clouds-aiplane',
    },
    {
      id: 3,
      title: 'main.travelBlog.thirdArticleTitle',
      description: 'main.travelBlog.thirdArticleDescription',
      date: '01/04/2023',
      link: 'main.travelBlog.readArticle',
      image: 'alley-human',
    },
    {
      id: 4,
      title: 'main.travelBlog.fourthArticleTitle',
      description: 'main.travelBlog.fourthArticleDescription',
      date: '01/04/2023',
      link: 'main.travelBlog.readArticle',
      image: 'india',
    },
  ];

  tourLocations: string[] = ['Мадрид', 'Париж', 'Лондон', 'Берлин', 'Монако', 'Барселона'];

  tourParticipants: string[] = ['Санжар', 'Влад', 'Нигина', 'Нурбек', 'Даурен', 'Магфират'];

  private saveLastVisit(): void {
    const date: Date = new Date();
    this.localStorageService.setValues('lastVisit', date);
  }

  private saveVisitCount(): void {
    const storedCount: number | null = this.localStorageService.getValue<number>('visitCount') ?? 0;
    const count: number = !storedCount ? 1 : storedCount + 1;
    this.localStorageService.setValues('visitCount', count);
  }

}
