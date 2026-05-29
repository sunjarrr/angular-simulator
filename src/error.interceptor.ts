import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from './message.service';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const messageService: MessageService = inject(MessageService);
  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500 && error.status <= 599) {
          messageService.showError('Ошибка сервера или соединения');
        }
        return throwError(() => error);
      })
    );

};
