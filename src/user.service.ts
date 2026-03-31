import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, finalize } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { IUser } from './interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);
  usersApi: UserApiService = inject(UserApiService);

  usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  };

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  };

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.usersApi.getUsers()
    .pipe(
      catchError(() => {
        this.messageService.showErrorMessage('Пользователи не отобразились');
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    )
  };

};