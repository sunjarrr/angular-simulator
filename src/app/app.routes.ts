import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';

export const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () => import('../features/posts/posts/posts.component').then(module => module.PostsComponent),
    children: [
      {
        path: 'create',
        loadComponent: () => import('../features/posts/post-create/post-create.component').then(module => module.PostCreateComponent),
      }
    ],
  },
  {
    path: 'posts',
    loadComponent: () => import('../features/posts/posts/posts.component').then(module => module.PostsComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(module => module.PostDetailComponent),
        resolve: {
          post: postResolver
        },
      }
    ],
  },
  {
    path: 'users-page',
    loadComponent: () =>
      import('../users-page/users-page.component').then(
        (module) => module.UsersPageComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('../home-page/home-page.component').then(
        (module) => module.HomePageComponent
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