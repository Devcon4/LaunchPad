import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Profile } from '../../models/profile';
import { Post } from '../../models/post';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent implements OnInit {

  constructor(public profileService: ProfileService, public postService: PostService, private route: ActivatedRoute) {
    route.params.subscribe(p => this.profileService.getDoc(p['id']));
  }

  ngOnInit() {
    // this.profileService.createDoc(new Profile({
    //   firstName: 'First',
    //   lastName: 'Last',
    //   companyName: 'Company',
    //   role: 'Role',
    //   bio: 'One paragraph user bio.'
    // }));

    // this.postService.createDoc(new Post({
    //   title: 'Title Three',
    //   shortDesc: 'A short description.',
    //   content: 'Content of a post.',
    //   longDesc: 'A long description of a post.'
    // }));
  }
}
