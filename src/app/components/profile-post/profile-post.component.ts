import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../models/post';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';
import { Profile } from '../../models/profile';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { Router } from '@angular/router';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class ProfilePostComponent implements OnInit {

  @Input()
  post: Post;

  constructor(public profileService: ProfileService, public postService: PostService, private router: Router) { }

  ngOnInit() { }

  onClick() {
    this.postService.getDoc(this.post.id);
    this.postService.document.subject.pipe(filter(x => !!x), take(1)).subscribe(x => this.router.navigate(['postEditor']));
    

    // this.postService.createDoc(new Post({
    //   title: 'Title One',
    //   longDesc: 'Some sort of description to fill the document up.',
    //   content: 'Some basic content'
    // }));

    // this.postService.deleteDoc(this.post.id);

    // this.postService.updateDoc(this.post.id, new Post({ title: this.post.title + this.post.title}));
  }

}
