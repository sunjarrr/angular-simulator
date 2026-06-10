import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';
import { PostService } from '../post.service';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);
  formBuilder: FormBuilder = inject(FormBuilder);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.dynamicDialogConfig.data;
  }

  form: FormGroup = this.formBuilder.group({
    title: this.dynamicDialogConfig.data.title,
    tags: this.dynamicDialogConfig.data.tags.join(', '),
    views: this.dynamicDialogConfig.data.views,
  });

  saveChanges(): void {
    const convertedData: Partial<IPost> = {
      title: this.form.value.title,
      tags: this.form.value.tags.split(', '),
      views: this.form.value.views,
    }
    this.postService.updatePost(this.dynamicDialogConfig.data.id, convertedData)
      .pipe(
        tap(() => this.dynamicDialogRef.close(),
      ),
      catchError(() => {
        this.messageService.showError('Не удалось сохранить изменения');
        return EMPTY;
      })
    ).subscribe();
    }

}