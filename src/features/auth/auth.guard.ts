import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  const user: boolean = authService.isAuthenticated();

  return user ? true : router.createUrlTree(['/login']);

};