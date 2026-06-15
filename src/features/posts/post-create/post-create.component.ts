import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../IPost';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
  standalone: true,
})
export class PostCreateComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: ['', [Validators.required]],
    body: ['', [Validators.required]],
    reactions: this.formBuilder.group({
      likes: [0, [Validators.required]],
      dislikes: [0, [Validators.required]],
    }),
    userId: ['', [Validators.required]],
  })

  onSubmit(): void {
    this.postService.createPost(this.form.value as Partial<IPost>)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
      ).subscribe();
    }

}