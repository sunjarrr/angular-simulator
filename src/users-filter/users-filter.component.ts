import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit, OnDestroy{

  @Input() filterUsers!: IUser;
  @Output() emitUsers: EventEmitter<string> = new EventEmitter<string>();
  searchInput: FormControl<string | null> = new FormControl<string | null>('');
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((value: string | null) => {
        this.emitUsers.emit(value || '');
      });
    };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

}