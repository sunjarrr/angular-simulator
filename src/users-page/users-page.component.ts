import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers().subscribe();
  }
}