import { Injectable } from '@angular/core';
import { INotification } from './interfaces/INotification';
import { MessageType } from './enums/MessageTypes';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: INotification[] = [];

  addMessage(title: string, content: string, type: MessageType): void {
    const id: number = Date.now();
    const newMessage: INotification = { id, title, content, type };
    this.messages = [newMessage, ...this.messages];
    setTimeout(() => {
      this.messages = this.messages.filter((message): boolean => message.id !== id);
    }, 5000);
  }

  showSuccessMessage(content: string): void {
    this.addMessage('Success', content, MessageType.SUCCESS);
  }

  showInfoMessage(content: string): void {
    this.addMessage('Info', content, MessageType.INFO);
  }

  showWarnMessage(content: string): void {
    this.addMessage('Warn', content, MessageType.WARN);
  }

  showErrorMessage(content: string): void {
    this.addMessage('Error', content, MessageType.ERROR);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}