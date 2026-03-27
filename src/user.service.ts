import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, finalize, pipe, tap, of, Observable } from 'rxjs';
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
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.turnOnSpinner();
    return this.usersApi.getUsers()
    .pipe(
      tap(users => this.setUsers(users)),
      catchError<IUser[], Observable<IUser[]>>((): Observable<IUser[]> => {
        this.messageService.showErrorMessage('Пользователи не отобразились');
        return of([]);
      }),
      finalize<IUser[]>(() => {
        setTimeout(()  => {
          this.loaderService.turnOffSpinner();
        }, 3000);
      })
    );
  }
}
