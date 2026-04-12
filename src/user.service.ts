import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, finalize, filter, map, tap } from 'rxjs';
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

  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    this.loaderService.showLoader();
      const data: string | null = !forceUpdate ? localStorage.getItem('users'): null;
      if(data) {
        const usersFromStorage: IUser[] = JSON.parse(data);
        this.setUsers(usersFromStorage);
        this.usersSubject.next(usersFromStorage);
        this.loaderService.hideLoader();
        return of(usersFromStorage);
      }
    return this.usersApi.getUsers()
      .pipe(
        tap((users: IUser[]) => {
          localStorage.setItem('users', JSON.stringify(users));
          this.setUsers(users);
        }),
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
    localStorage.setItem('users', JSON.stringify(filteredUsers));
  };

  createUser(newUser: IUser): void {
    const users: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = ([...users, newUser]);
    this.usersSubject.next(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  filterUsers(name: string): IUser[] {
    const oldUsers: IUser[] = this.getUsers();
    return oldUsers.filter((user: IUser) => user.name.toLowerCase().includes(name.toLowerCase()));
  };

};