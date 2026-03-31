import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { MessageType } from './enums/MessageTypes';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(content: string, type: MessageType): void {
    const id: number = Date.now();
    const newMessage: IMessage = { id, title: type, content, type };
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
    const messageList: IMessage[] = this.messagesSubject.getValue();
    const filteredList: IMessage[] = messageList.filter((message: IMessage) => message.id !== id);
    this.messagesSubject.next([...filteredList]);
  }

}