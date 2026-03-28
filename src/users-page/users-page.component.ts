import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  private loaderService: LoaderService = inject(LoaderService);

  users$: Observable<IUser[]> = this.userService.users$;
  isLoader$ = this.loaderService.isLoader$;

  constructor() {
    this.userService.loadUsers().subscribe();
  }
}