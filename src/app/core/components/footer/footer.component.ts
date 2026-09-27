import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTelegram,
  faVk,
  faPinterest,
  faSkype,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { IApplicationConfig } from '../../interfaces/IApplicationConfig';
import { applicationConfig } from '../../tokens/config.token';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;
  config: IApplicationConfig = inject(applicationConfig);

}