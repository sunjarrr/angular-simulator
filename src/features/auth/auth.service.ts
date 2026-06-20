import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from './IAuth';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { IAuthResponse } from './IAuthResponse';
import { MessageService } from '../../message.service';
import { IAuthUser } from './IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  userStatusSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(this.localStorageService.getValues<IAuthUser>('currentUser'));
  userStatus$: Observable<IAuthUser | null> = this.userStatusSubject.asObservable();

  saveTokens(response: IAuthResponse): void {
    const tokens: Pick<IAuthResponse, 'accessToken' | 'refreshToken'> = { accessToken: response.accessToken, refreshToken: response.refreshToken };
    this.localStorageService.setValues('tokens', tokens);
  }

  loginRequest(userData: IAuth): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`https://dummyjson.com/auth/login`, userData)
      .pipe(
        tap((response: IAuthResponse) => {
          const { accessToken, refreshToken, ...userInfo } = response;
          this.saveTokens(response);
          this.localStorageService.setValues('currentUser', userInfo);
          this.userStatusSubject.next(userInfo);
        }),
        catchError(() => {
          this.messageService.showError('Не верный логин или пароль');
          return EMPTY;
        }),
      );
    }

  getToken(): string | null {
    return this.localStorageService.getValues('tokens');
  }

  isAuthenticated(): boolean {
    return this.userStatusSubject.value !== null;
  }

  logout(): void {
    this.localStorageService.clearElement('tokens');
    this.localStorageService.clearElement('currentUser');
    this.userStatusSubject.next(null);
  }

  refreshToken(): Observable<IAuthResponse> {
    const tokens: Pick<IAuthResponse, 'refreshToken'> = this.localStorageService.getValues<{ refreshToken: string }>('tokens') ?? { refreshToken: ''};
    const { refreshToken } = tokens;
    const sendRefreshToken: Pick<IAuthResponse, 'refreshToken'> = {
      refreshToken: refreshToken,
    }
    return this.httpClient.post<IAuthResponse>('https://dummyjson.com/auth/refresh', sendRefreshToken)
      .pipe(
        tap((response: IAuthResponse) => {
          this.saveTokens(response);
        }),
      );
    }

}