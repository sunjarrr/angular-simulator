import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { NgTemplateOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  messages$: Observable<IMessage[]> = this.messageService.messages$;

  faCircleXmark: IconDefinition = faCircleXmark;

}