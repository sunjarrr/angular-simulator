import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../phone.pipe';
import { HoverDirective } from "../hover.directive";
import { AnimatedGradientDirective } from "../animated-gradient.directive";
import { PhoneMode } from '../enums/PhoneMode';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective, AnimatedGradientDirective],
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