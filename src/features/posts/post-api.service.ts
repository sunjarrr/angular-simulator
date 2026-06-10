import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './IPost';
import { HttpClient } from '@angular/common/http';
import { IPostResponse } from './IPostResponse';


@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private httpClient: HttpClient = inject(HttpClient);

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  }

  getPost(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    return this.httpClient.put<IPost>(`https://dummyjson.com/posts/${id}`, data);
  }

  deletePost(id: number): Observable<IPost> {
    return this.httpClient.delete<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.httpClient.post<IPost>('https://dummyjson.com/posts/add', post);
  }

}