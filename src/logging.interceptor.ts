import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const LoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const requestTime: number = Date.now();
  return next(req)
    .pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log(req.method, req.url, event.status, Date.now() - requestTime);
        }
      })
    )

};