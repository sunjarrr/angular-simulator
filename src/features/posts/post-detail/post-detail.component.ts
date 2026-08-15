import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../IPost';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-detail',
  imports: [TableModule, TranslatePipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }

}
