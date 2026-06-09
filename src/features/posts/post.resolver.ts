import { ResolveFn } from '@angular/router';
import { PostApiService } from './post-api.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './IPost';

export const postResolver: ResolveFn<Observable<IPost>> = (route) => {

  const postApiService: PostApiService = inject(PostApiService);
  const post: string = route.paramMap.get('id')!;
  const parse: number = +post;

  return postApiService.getPost(parse);

};