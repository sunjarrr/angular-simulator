import { Component, inject } from '@angular/core';
import './training';
import './collection';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from '../loader/loader.component';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../features/auth/auth.service';
import { IAuthUser } from '../features/auth/IAuthUser';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, FormsModule, HeaderComponent, FooterComponent, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  authService: AuthService = inject(AuthService);
  isLoggedIn$: Observable<boolean> = this.authService.currentUser$
    .pipe(
      map((user: IAuthUser | null) => !!user),
    )

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

}