import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { MessageService } from '../message.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersFilterComponent } from '../users-filter/users-filter.component';


@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, FormsModule, UsersFilterComponent, ReactiveFormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit{

  userService: UserService = inject(UserService);
  messageService: MessageService = inject(MessageService);

  filteredUsers: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  searchInput = new FormControl('');

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
    };

  deleteUsers(id: number): void {
    this.userService.deleteUser(id);
  }

  addUser(newUser: IUser): void {
    this.userService.createUser(newUser);
  }

  refresh(): void {
    this.userService.loadUsers(true).subscribe();
  }

  filterByName(name: string): void {
    const filtered: IUser[] = this.userService.filterUsers(name);
    this.filteredUsers.next(filtered);
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe(value => {
      this.filterByName(value || '')});
      this.userService.users$.subscribe((users: IUser[]) => {
        this.filteredUsers.next(users);
      });
    }

};