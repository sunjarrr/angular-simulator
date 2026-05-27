import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../home-page/home-page.component').then(
        (module) => module.HomePageComponent
      ),
  },
  {
    path: 'users-page',
    loadComponent: () =>
      import('../users-page/users-page.component').then(
        (module) => module.UsersPageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent
      ),
  },
];
