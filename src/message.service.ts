import { Injectable } from '@angular/core';
import { INotification } from './interfaces/INotification';
import { MessageType } from './enums/MessageTypes';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: INotification[] = [];

  private addMessage(content: string, type: MessageType): void {
    const id: number = Date.now();
    const newMessage: INotification = { id, title: type, content, type };
    this.messages = [newMessage, ...this.messages];
    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }

  showSuccessMessage(content: string): void {
    this.addMessage(content, MessageType.SUCCESS);
  }

  showInfoMessage(content: string): void {
    this.addMessage(content, MessageType.INFO);
  }

  showWarnMessage(content: string): void {
    this.addMessage(content, MessageType.WARN);
  }

  showErrorMessage(content: string): void {
    this.addMessage(content, MessageType.ERROR);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((message: INotification) => message.id !== id);
  }
}