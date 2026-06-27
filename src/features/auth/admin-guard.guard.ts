import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../../enums/UserRole';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAdmin: boolean = authService.getUser()?.role === UserRole.ADMIN;

  return isAdmin ? true : router.createUrlTree(['**']);

};