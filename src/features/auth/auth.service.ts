import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './ILogin';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { IAuthResponse } from './IAuthResponse';
import { MessageService } from '../../message.service';
import { IAuthUser } from './IAuthUser';
import { IToken } from './IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(this.getCurrentUser());
  currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

  saveTokens(response: IAuthResponse): void {
    const tokens: IToken = { accessToken: response.accessToken, refreshToken: response.refreshToken };
    this.localStorageService.setValues('tokens', tokens);
  }

  getCurrentUser(): IAuthUser | null {
    return this.localStorageService.getValue<IAuthUser>('currentUser');
  }

  login(userData: ILogin): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`https://dummyjson.com/auth/login`, userData)
      .pipe(
        tap((response: IAuthResponse) => {
          const { accessToken, refreshToken, ...userInfo }: IAuthResponse = response;
          this.saveTokens(response);
          this.currentUserSubject.next(userInfo);
        }),
        catchError(() => {
          this.messageService.showError('Не верный логин или пароль');
          return EMPTY;
        }),
      );
    }

  getToken(): string | null {
    return this.localStorageService.getValue('tokens');
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout(): void {
    this.localStorageService.clearElement('tokens');
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<IAuthResponse> {
    const tokens: IToken = this.localStorageService.getValue<IToken>('tokens') ?? { refreshToken: ''};
    const { refreshToken }: IToken = tokens;
    const sendRefreshToken: IToken = {
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