import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { Observable, catchError, finalize, tap, of } from 'rxjs';
import { LoaderService } from '../loader.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  private loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);

  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
    };

};