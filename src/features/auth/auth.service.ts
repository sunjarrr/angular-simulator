import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from './IAuth';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { IAuthResponse } from './IAuthResponse';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  statusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  status$: Observable<boolean> = this.statusSubject.asObservable();

  loginRequest(userData: IAuth): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`https://dummyjson.com/auth/login`, userData)
      .pipe(
        tap((response: IAuthResponse) => {
          this.localStorageService.setValues('accessToken', response.accessToken);
          this.localStorageService.setValues('refreshToken', response.refreshToken);
          this.statusSubject.next(true);
        }),
        catchError(() => {
          this.messageService.showError('Не верный логин или пароль');
          return EMPTY;
        }),
      )
    }

  getToken(): string | null {
    return this.localStorageService.getValues('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.localStorageService.clearElement('accessToken');
    this.localStorageService.clearElement('refreshToken');
    this.statusSubject.next(false);
  }

  refreshToken(): Observable<IAuthResponse> {
    const refresh: string | null = this.localStorageService.getValues<string>('refreshToken') ?? '';
    const sendRefreshToken: Pick<IAuthResponse, 'refreshToken'> = {
      refreshToken: refresh
    }
    return this.httpClient.post<IAuthResponse>('https://dummyjson.com/auth/refresh', sendRefreshToken)
      .pipe(
        tap((response: IAuthResponse) => {
          this.localStorageService.setValues('accessToken', response.accessToken);
          this.localStorageService.setValues('refreshToken', response.refreshToken);
        })
      )
    }

}