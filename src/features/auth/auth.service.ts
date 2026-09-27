import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './interfaces/ILogin';
import { LocalStorageService } from '../../app/core/services/local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { IAuthResponse } from './interfaces/IAuthResponse';
import { IAuthUser } from './interfaces/IAuthUser';
import { IToken } from './interfaces/IToken';
import { IApplicationConfig } from '../../app/core/interfaces/IApplicationConfig';
import { applicationConfig } from '../../app/core/tokens/config.token';
import { MessageService } from '../../app/core/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(
    null,
  );

  currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();
  private API_URL: string = 'https://dummyjson.com';
  config: IApplicationConfig = inject(applicationConfig);

  saveTokens(response: IAuthResponse): void {
    const tokens: IToken = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    this.localStorageService.setValues('tokens', tokens);
  }

  getCurrentProfile(): Observable<IAuthUser | null> {
    return this.httpClient.get<IAuthUser | null>(`${ this.API_URL }/auth/me`).pipe(
      tap((result: IAuthUser | null) => {
        this.currentUserSubject.next(result);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return EMPTY;
      }),
    );
  }

  login(userData: ILogin): Observable<IAuthResponse> {
    const data: IApplicationConfig | ILogin = {
      sessionTimeout: this.config.sessionTimeout, ...userData
    };
    return this.httpClient.post<IAuthResponse>(`${ this.API_URL }/auth/login`, data).pipe(
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

  getUser(): IAuthUser | null {
    return this.currentUserSubject.value;
  }

  getTokens(): IToken | null {
    return this.localStorageService.getValue('tokens') ?? null;
  }

  getAccessToken(): string | null {
    const tokens: IToken | null = this.getTokens();
    return tokens?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    const tokens: IToken | null = this.getTokens();
    return tokens?.refreshToken ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout(): void {
    this.localStorageService.clearElement('tokens');
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<IAuthResponse> {
    const tokens: IToken | null = this.getTokens();
    return this.httpClient
      .post<IAuthResponse>(`${ this.API_URL }/auth/refresh`, { refreshToken: tokens?.refreshToken, sessionTimeout: this.config.sessionTimeout })
      .pipe(
        tap((response: IAuthResponse) => {
          this.saveTokens(response);
        }),
      );
  }

}
