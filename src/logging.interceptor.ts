import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const LoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const requestTime: number = Date.now();
  return next(req)
    .pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log(req.method, req.url, event.status, Date.now() - requestTime);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );

};