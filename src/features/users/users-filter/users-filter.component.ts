import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filter: EventEmitter<string> = new EventEmitter<string>();
  filterControl: FormControl<string | null> = new FormControl<string | null>('');
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: string | null) => {
          this.filter.emit(value || '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

}
