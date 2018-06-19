import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { concatMap, tap, combineLatest, skip } from 'rxjs/operators';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { Post } from '../../models/post';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';
import { AuthService } from '../../firebaseDataAccessLayer/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  
  isMyProfile = this.profileService.doc.subject.pipe(
    skip(1),
    combineLatest(
      this.authService.doc.subject,
      (s1 = {} as any, s2 = {} as any) => s1.id === s2.id
    ));
    
  constructor(public postService: PostService, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() { }
}
