import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../models/post';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class ProfilePostComponent implements OnInit {

  @Input()
  post: Post;

  constructor(public profileService: ProfileService) { }

  ngOnInit() { }

  onClick() {

    // this.postService.createDoc(new Post({
    //   title: 'Title One',
    //   longDesc: 'Some sort of description to fill the document up.',
    //   content: 'Some basic content'
    // }));

    // this.postService.deleteDoc(this.post.id);

    // this.postService.updateDoc(this.post.id, new Post({ title: this.post.title + this.post.title}));
  }

}
