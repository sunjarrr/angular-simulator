import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, finalize, filter, map, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { IUser } from './interfaces/IUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);
  usersApi: UserApiService = inject(UserApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setValues('users', users);
  };

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  };

  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    const usersFromStorage = this.localStorageService.getValues<IUser[]>('users') || [];
    if (!forceUpdate && usersFromStorage.length > 0) {
      this.usersSubject.next(usersFromStorage);
      return of(usersFromStorage);
    }
    this.loaderService.showLoader();
    return this.usersApi.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Произошла ошибка при загрузке');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
    };

  deleteUser(id: number): void {
    const currentUser: IUser[] = this.getUsers();
    const filteredUsers: IUser[] = currentUser.filter((user: IUser) => user.id !== id);
    this.setUsers(filteredUsers);
  };

  createUser(newUser: IUser): void {
    const users: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = ([...users, newUser]);
    this.setUsers(updatedUsers);
  };

};