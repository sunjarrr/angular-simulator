import { Injectable } from '@angular/core';
import { INotification } from './interfaces/INotification';
import { MessageType } from './enums/MessageTypes';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);
  messages$: Observable<INotification[]> = this.messagesSubject.asObservable();

  private addMessage(content: string, type: MessageType): void {
    const id: number = Date.now();
    const newMessage: INotification = { id, title: type, content, type };
    this.messagesSubject.next([newMessage, ...this.messagesSubject.getValue()]);
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
    const messageList: INotification[] = this.messagesSubject.getValue();
    const filteredList: INotification[] = messageList.filter((message: INotification) => message.id !== id);
    this.messagesSubject.next([...filteredList]);
  }
}