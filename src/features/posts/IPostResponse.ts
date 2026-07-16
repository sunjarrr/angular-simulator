import { IPost } from './IPost';

export interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
