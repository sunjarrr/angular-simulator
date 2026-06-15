export interface IPost {
  id: number;
  title: string;
  tags: string[];
  views: number;
  body: string;
  reactions: {
    likes: number;
    dislikes: number;
  }
  userId: number;
}