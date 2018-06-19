import { Component, OnInit } from '@angular/core';
import createFormGroup from '../../../helpers/createFormGroup';
import { PostService } from '../../../firebaseDataAccessLayer/post.service';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  postForm = createFormGroup(this.postService.doc.state, {
  });

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  save() {
    this.postService.createDoc(this.postForm.value);
  }
}
