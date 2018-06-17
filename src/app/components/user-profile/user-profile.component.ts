import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { interval, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() { }
}
