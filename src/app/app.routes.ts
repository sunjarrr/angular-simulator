import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { authGuard } from '../features/auth/auth.guard';
import { adminGuard } from '../features/auth/admin-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component').then(module => module.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('../features/auth/layout/layout.component').then(
      (module => module.LayoutComponent),
    ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../home-page/home-page.component').then(
          (module => module.HomePageComponent),
        ),
        pathMatch: 'full',
      },
      {
        path: 'posts/create',
        loadComponent: () => import('../features/posts/post-create/post-create.component').then(module => module.PostCreateComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'posts/:id',
        loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(module => module.PostDetailComponent),
        resolve: {
          post: postResolver,
        },
        canActivate: [adminGuard],
      },
      {
        path: 'posts',
        loadComponent: () => import('../features/posts/posts/posts.component').then(module => module.PostsComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'users-page',
        loadComponent: () =>
        import('../users-page/users-page.component').then(
          (module) => module.UsersPageComponent
        ),
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent
      ),
  },
];