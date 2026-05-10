import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}