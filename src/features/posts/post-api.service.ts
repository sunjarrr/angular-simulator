import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { IPost } from './IPost';
import { HttpClient } from '@angular/common/http';
import { IPostResponse } from './IPostResponse';
import { LoaderService } from '../../loader.service';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private httpClient: HttpClient = inject(HttpClient);
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService)

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось получить посты');
          return EMPTY;
        }),
      )
    }

  getPost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.httpClient.get<IPost>(`https://dummyjson.com/posts/${id}`)
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
    return this.httpClient.put<IPost>(`https://dummyjson.com/posts/${id}`, data)
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
    return this.httpClient.delete<IPost>(`https://dummyjson.com/posts/${id}`)
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
    return this.httpClient.post<IPost>('https://dummyjson.com/posts/add', post)
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