import { Component, OnInit } from '@angular/core';
import createFormGroup from '../../helpers/createFormGroup';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { Validators, FormGroup } from '@angular/forms';
import { Post } from '../../models/post';
import { MatDialog } from '@angular/material';
import { CreatePostModalComponent } from '../modals/create-post-modal/create-post-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create-post',
  templateUrl: './profile-create-post.component.html',
  styleUrls: ['./profile-create-post.component.scss']
})
export class ProfileCreatePostComponent implements OnInit {

  postForm = createFormGroup(new Post({}));

  constructor(public postService: PostService, private dialog: MatDialog, private router: Router) { }

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
    this.router.navigate(['/postEditor']);
  }
}
