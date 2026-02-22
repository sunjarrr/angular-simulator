import { Injectable } from '@angular/core';
import { INotification } from './interfaces/INotification';
import { MessageType } from './enums/MessageType';

@Injectable()
export class MessageManagementService {

  messages: INotification[] = [];

  addMessage(title: string, content: string, type: MessageType) {
    const id: number = Date.now();
    const newMessages: INotification = {
      id,
      title,
      content,
      type
    }
    this.messages.unshift(newMessages);
    setTimeout(() => {
      this.messages = this.messages.filter((message => message.id !== id));
    }, 5000);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}