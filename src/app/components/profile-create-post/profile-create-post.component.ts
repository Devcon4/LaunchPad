import { Component, OnInit } from '@angular/core';
import createFormGroup from '../../helpers/createFormGroup';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { Validators, FormGroup } from '@angular/forms';
import { Post } from '../../models/post';
import { MatDialog } from '@angular/material';
import { CreatePostModalComponent } from '../modals/create-post-modal/create-post-modal.component';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ContentService } from '../../firebaseDataAccessLayer/content.service';
import { Content } from '../../models/content';

@Component({
  selector: 'app-profile-create-post',
  templateUrl: './profile-create-post.component.html',
  styleUrls: ['./profile-create-post.component.scss']
})
export class ProfileCreatePostComponent implements OnInit {

  postForm = createFormGroup({...new Post({}), title: ''});

  constructor(public postService: PostService, public contentService: ContentService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() { }

  openPostModal() {
    this.postService.doc.state = this.postForm.value;
    this.dialog.open(CreatePostModalComponent, {
      minWidth: '25vw',
    }).afterClosed().subscribe(v => {
      this.postService.doc.state = new Post({});
      this.postForm.reset();
    });
  }

  openPostPage() {
    this.postService.doc.state = this.postForm.value;
    console.log(this.postForm.value);
    this.contentService.list.state = [
      new Content({
        type: 'Title',
        text: this.postForm.value['title']
      }),
      new Content({
        type: 'Paragraph',
        text: this.postForm.value['longDesc']
      })
    ];
    this.postService.doc.subject.pipe(take(1)).subscribe(d => this.router.navigate(['/postEditor', d.id]));
    this.postService.createDoc(this.postForm.value);

    // this.router.navigate(['/postEditor']);
  }
}
