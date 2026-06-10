import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { MessageService } from '../../message.service';
import { LoaderService } from '../../loader.service';
import { IPost } from './IPost';
import { IPostResponse } from './IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip)
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось получить посты');
          return EMPTY;
        }),
      )
    }

  getPost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showError('Не удалось получить пост');
          return EMPTY;
        }),
      )
    }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.updatePost(id, data)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showError('Редактирование не удалось');
          return EMPTY;
        }),
      )
    }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showError('Не удалось удалить пост');
          return EMPTY;
        }),
      )
    }

  filterPost(posts: IPost[], id: number): IPost[] {
    return posts.filter(post => post.id !== id);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(post)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showError('Не удалось создать пост');
          return EMPTY;
        }),
      )
    }

}
