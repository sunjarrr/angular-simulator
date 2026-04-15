import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
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

  filterControl: FormControl<string | null> = new FormControl('');
  filterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredUsers$!: Observable<IUser[]>;

  constructor() {};

  ngOnInit(): void {
    this.filteredUsers$ = combineLatest([this.userService.users$, this.filterValue$]).pipe(
      map(([users, value]) => {
        return users.filter((user: IUser) => user.name.toLowerCase().includes(value.toLowerCase()));
      },
    )),
    this.filterControl.valueChanges.pipe(
      tap((value: string | null) => { 
        this.onFilter(value || '');
      }
    )).subscribe();
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
    }

  onDeleteUsers(id: number): void {
    this.userService.deleteUser(id);
  }

  onAddUser(newUser: IUser): void {
    this.userService.createUser(newUser);
  }

  onFilter(name: string): void {
    this.filterValue$.next(name);
  }

};