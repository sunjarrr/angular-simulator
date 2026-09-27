import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { applicationConfig } from '../tokens/config.token';
import { IMessage } from '../interfaces/IMessage';
import { IApplicationConfig } from '../interfaces/IApplicationConfig';
import { MessageType } from '../interfaces/MessageTypes';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  config: IApplicationConfig = inject(applicationConfig);
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(content: string, type: MessageType): void {
    const id: number = Date.now();
    const newMessage: IMessage = { id, title: type, content, type };
    if (this.config.enableNotifications) {
      this.messagesSubject.next([newMessage, ...this.messagesSubject.getValue()]);
    }
    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }

  showSuccess(content: string): void {
    this.addMessage(content, MessageType.SUCCESS);
  }

  showInfo(content: string): void {
    this.addMessage(content, MessageType.INFO);
  }

  showWarn(content: string): void {
    this.addMessage(content, MessageType.WARN);
  }

  showError(content: string): void {
    this.addMessage(content, MessageType.ERROR);
  }

  closeMessage(id: number): void {
    const messageList: IMessage[] = this.messagesSubject.getValue();
    const filteredList: IMessage[] = messageList.filter((message: IMessage) => message.id !== id);
    this.messagesSubject.next([...filteredList]);
  }

}