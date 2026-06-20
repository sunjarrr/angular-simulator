import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const originalRequestCopy: HttpRequest<unknown> = req.clone({
    setHeaders: {
      Authorization: `Bearer ${ authService.getToken() }`
    },
  });

  const finalRequest: HttpRequest<unknown> = authService.getToken() ? originalRequestCopy : req;
  return next(finalRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshToken()
            .pipe(
              switchMap(() => {
                const newClonedRequest: HttpRequest<unknown> = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${ authService.getToken() }`
                  },
                })
                return next(newClonedRequest);
              }),
              catchError(() => {
                authService.logout();
                router.navigate(['/login']);
                return EMPTY;
              })
            )
          } else {
            return throwError(() => error);
          }
        })
      )

}