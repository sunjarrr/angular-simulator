import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { HoverDirective } from '../../../app/shared/directives/hover.directive';
import { PhoneMode } from '../enums/PhoneMode';
import { TranslatePipe } from '@ngx-translate/core';
import { PhonePipe } from '../../../app/shared/pipes/phone.pipe';
import { AnimatedGradientDirective } from '../../../app/shared/directives/animated-gradient.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective, AnimatedGradientDirective, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() removeUser: EventEmitter<number> = new EventEmitter<number>();
  phoneMode: typeof PhoneMode = PhoneMode;

  deleteUser(): void {
    this.removeUser.emit(this.user.id);
  }

}
