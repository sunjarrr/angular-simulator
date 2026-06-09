import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PostApiService } from '../post-api.service';
import { IPost } from '../IPost';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
  standalone: true,
})
export class PostCreateComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  form = this.formBuilder.group({
    title: [],
    tags: [],
    views: [],
    body: [],
    reactions: this.formBuilder.group({
      likes: [0],
      dislikes: [0],
    }),
    userId: [],
  })

  onSubmit(): void {
    this.postApiService.createPost(this.form.value as Partial<IPost>)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
      ).subscribe();
    }

}