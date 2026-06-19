import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { authGuard } from '../features/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'posts/create',
    loadComponent: () => import('../features/posts/post-create/post-create.component').then(module => module.PostCreateComponent),
    canActivate: [authGuard],
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(module => module.PostDetailComponent),
    canActivate: [authGuard],
    resolve: {
      post: postResolver
    },
  },
  {
    path: 'posts',
    loadComponent: () => import('../features/posts/posts/posts.component').then(module => module.PostsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component').then(module => module.LoginComponent),
  },
  {
    path: 'users-page',
    loadComponent: () =>
      import('../users-page/users-page.component').then(
        (module) => module.UsersPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('../home-page/home-page.component').then(
        (module) => module.HomePageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent
      ),
    canActivate: [authGuard],
  },
];