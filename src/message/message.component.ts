import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { NgTemplateOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { INotification } from '../interfaces/INotification';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messageService: MessageService = inject(MessageService);
  messages$: Observable<INotification[]> = this.messageService.messages$;
}