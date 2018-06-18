import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from '../modals/edit-profile/edit-profile.component';
import { AuthService } from '../../firebaseDataAccessLayer/auth.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    public postService: PostService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
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

  openProfileModal() {
    this.dialog.open(EditProfileComponent, {
      minWidth: '25vw'
    });
  }

  isMyProfile = this.profileService.doc.subject.pipe(
      combineLatest(
        this.authService.doc.subject,
        (s1 = {} as any, s2 = {} as any) => s1.id === s2.id
      ));
}
