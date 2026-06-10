import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { IPost } from '../IPost';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { IPostResponse } from '../IPostResponse';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { AsyncPipe } from '@angular/common';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, ButtonModule, AsyncPipe, RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService]
})
export class PostsComponent implements OnInit {

  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  postService: PostService = inject(PostService);
  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  isLoading: boolean = true;
  pageSize: number = 10;
  totalRecords: number = 0;
  firstNumber: number = 0;
  selectedPost!: IPost | null;

  menuItems: MenuItem[] = [
    {
      label: 'Просмотр',
      command: () => {
        this.onView();
      }
    },
    {
      label: 'Редактировать',
      command: () => {
        this.onEdit();
      }
    },
    {
      label: 'Удалить',
      command: () => {
        this.onDelete();
      }
    },
  ];

  ngOnInit() {
    this.loadPosts(this.pageSize, this.firstNumber);
  }

  loadPosts(limit: number, skip: number): void {
    this.postService.getPosts(limit, skip)
      .pipe(
        tap((response: IPostResponse) => {
          this.postsSubject.next(response.posts);
          this.totalRecords = response.total;
          this.isLoading = false;
        }),
      ).subscribe();
    }

  pageChange(event: any): void {
    this.loadPosts(event.rows, event.first);
  }

  onPostSelect(id: number): void {
    this.router.navigate([`/posts/${ id }`])
  }

  onView(): void {
    if (this.selectedPost !== null) {
      this.onPostSelect(this.selectedPost.id);
    }
  }

  onEdit(): void {
    this.dialogService.open(PostEditDialogComponent, {
      header: 'Post Edit',
      width: '50vw',
      modal: true,
      contentStyle: {
        overflow: 'auto'
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: this.selectedPost,
      draggable: false,
    });
  }

  onDelete(): void {
    const selectedPostId: number | undefined = this.selectedPost?.id!;
    if (this.selectedPost !== null) {
      this.postService.deletePost(this.selectedPost.id)
        .pipe(
          tap(() => {
            const deletePost: IPost[] = this.postService.filterPost(this.postsSubject.getValue(), selectedPostId);
            this.postsSubject.next(deletePost);
          }
        )
      ).subscribe();
    }
  }

}