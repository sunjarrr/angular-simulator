import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { applicationConfig } from './config.token';
import { IApplicationConfig } from './interfaces/IApplicationConfig';

export const LoggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const requestTime: number = Date.now();
  const config: IApplicationConfig = inject(applicationConfig);
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse && config.enableLogs) {
        console.log(req.method, req.url, event.status, Date.now() - requestTime);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(req.method, req.url, error.status, Date.now() - requestTime);
      return throwError(() => error);
    }),
  );
};