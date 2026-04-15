import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, DestroyRef, inject } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() onSearchUser: EventEmitter<string> = new EventEmitter<string>();
  searchInput: FormControl<string | null> = new FormControl<string | null>('');
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string | null) => {
        this.onSearchUser.emit(value || '');
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  };

}